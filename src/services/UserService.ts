import bcrypt from 'bcryptjs';

import UserDao from '@daos/UserDao';
import logger from '@shared/Logger';
import { IUser, IBaseUser } from '@models/user';

class UserService {

  public saltRounds: number;
  public userDao: UserDao;

  constructor() {
    this.saltRounds = 10;
    this.userDao = new UserDao();
  }

  public async findAllUsers(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await this.userDao.findAllUsers(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findAllUsers -> e', error.message);
    }
  }

  public async findUser(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await this.userDao.findUser(criteria, projection, options);
    } catch (error) {
      logger.error('TCL: findUser -> e', error);
      throw error;
    }
  }

  public async createUser(user: IBaseUser) {
    try {
      const newPassword = await bcrypt.hash(user.password, this.saltRounds);
      const newUser: IBaseUser = {
        status: user.status,
        email: user.email,
        password: newPassword,
        fullname: user.fullname,
        address: user.address,
      } as IBaseUser;

      return await this.userDao.createUser(newUser);
    } catch (error) {
      logger.info('TCL: createUserSvc -> e', error);
      throw error;
    }
  }

  public async updateUser(criteria: any, dataToUpdate: any = {}, options: any = {}) {
    try {
      const newPassword = await bcrypt.hash(dataToUpdate.password, this.saltRounds);
      const updateUser: IUser = {
        status: dataToUpdate.status,
        email: dataToUpdate.email,
        password: newPassword,
        fullname: dataToUpdate.fullname,
        address: dataToUpdate.address,
        pictureKey: dataToUpdate.pictureKey,
        pictureKeyLow: dataToUpdate.pictureKeyLow,
      } as IUser;

      return await this.userDao.updateUser(criteria, updateUser, options);
    } catch (error) {
      logger.info('TCL: updateUser -> e', error);
      throw error;
    }
  }

  public async deleteUser(criteria: any) {
    try {
      const dataToUpdate = {
        status: false
      };

      return await this.userDao.deleteUser(criteria, dataToUpdate);
    } catch (error) {
      logger.info('TCL: deleteUser -> e', error);
      throw error;
    }
  }
}

export default UserService;
