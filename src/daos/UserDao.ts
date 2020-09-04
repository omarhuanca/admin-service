import UserModel, { IBaseUser } from '@models/user';
import ErrorHandler from '@helpers/errorHandler/index';
import logger from '@shared/Logger';

class UserDao {

  public async findAll(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await UserModel.find(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findAll -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }

  public async findOne(criteria: any, projection: any = {}, options: any = {}) {
    try {
      return await UserModel.findOne(criteria, projection, options);
    } catch (error) {
      logger.info('TCL: findOne -> error', error);
      throw new ErrorHandler(404, 'Object_NOT_FOUND');
    }
  }

  public async create(user: IBaseUser) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      logger.info('TCL: create -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.message}`);
    }
  }

  public async update(criteria: any, dataToUpdate: any = {}, options: any = {}) {
    try {
      return await UserModel.findOneAndUpdate(criteria, dataToUpdate, options);
    } catch (error) {
      logger.info('TCL: update -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }

  public async delete(criteria: any, dataToUpdate: any = {}) {
    try {
      return await UserModel.findOneAndUpdate(criteria, dataToUpdate);
    } catch (error) {
      logger.info('TCL: delete -> error', error);
      throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
    }
  }
}

export default UserDao;
