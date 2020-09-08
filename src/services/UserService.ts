import bcrypt from 'bcryptjs';

import UserDao from '@daos/UserDao';
import logger from '@shared/Logger';
import { IUser, IBaseUser } from '@models/user';

class UserService {

  private saltRounds: number;
  private dao: UserDao;

  constructor() {
    this.saltRounds = 10;
    this.dao = new UserDao();
  }

  public async findAll(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await this.dao.findAll(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findAll -> e', error.message);
      throw error;
    }
  }

  public async findOne(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await this.dao.findOne(criteria, projection, options);
    } catch (error) {
      logger.error('TCL: findOne -> e', error);
      throw error;
    }
  }

  public async create(user: IBaseUser) {
    try {
      const newPassword = await bcrypt.hash(user.password, this.saltRounds);
      const newUser: IBaseUser = {
        status: user.status,
        email: user.email,
        password: newPassword,
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
      } as IBaseUser;

      return await this.dao.create(newUser);
    } catch (error) {
      logger.info('TCL: create -> e', error);
      throw error;
    }
  }

  public async update(criteria: any, dataToUpdate: any = {}, options: any = {}) {
    try {
      const object = await this.dao.findOne(criteria);
      if (object) {
        let newPassword = object.password;
        if (object.password !== dataToUpdate.password) {
          newPassword = await bcrypt.hash(dataToUpdate.password, this.saltRounds);;
        }

        const updateUser: IUser = {
          status: dataToUpdate.status,
          email: dataToUpdate.email,
          password: newPassword,
          fullname: dataToUpdate.fullname,
          address: dataToUpdate.address,
          phoneNumber: dataToUpdate.phoneNumber,
          pictureKey: dataToUpdate.pictureKey,
          pictureKeyLow: dataToUpdate.pictureKeyLow,
        } as IUser;

        return await this.dao.update(criteria, updateUser, options);
      }
    } catch (error) {
      logger.info('TCL: update -> e', error);
      throw error;
    }
  }

  public async delete(criteria: any) {
    try {
      const dataToUpdate = {
        status: false
      };

      return await this.dao.delete(criteria, dataToUpdate);
    } catch (error) {
      logger.info('TCL: delete -> e', error);
      throw error;
    }
  }
}

export default UserService;
