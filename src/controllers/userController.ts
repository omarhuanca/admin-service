import { Request, Response, NextFunction } from 'express';
import { omit, get } from 'lodash';

import ErrorHandler from '@helpers/errorHandler';
import SuccessHandler from '@helpers/successHandler';
import UserService from '@services/UserService';
import { IBaseUser } from '@models/user';
import logger from '@shared/Logger';

interface IRequest extends Request {
  [key : string] : any;
}

const omitKeys = ['createdAt', 'updatedAt'];
const userService = new UserService();
const successHandler = new SuccessHandler();

export const getAllUsers = async (req: IRequest, res: Response, next: NextFunction) => {
  const defaultStatus = get(req, 'query.status', true);
  const criteria = {
    status: defaultStatus
  };

  try {
    const data = await userService.findAllUsers(criteria);
    successHandler.handleSuccess(200, 'User list', res, next, data);
  } catch (error) {
    logger.info('ERROR: controller -> getAllUsers', error);
    next(new ErrorHandler(500, error));
  }
};

export const getUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const criteria = {
    _id: id,
  };

  try {
    const data = await userService.findUser(criteria);
    successHandler.handleSuccess(200, 'User fetch', res, next, omit(data, omitKeys));
  } catch(error) {
    logger.info('ERROR: controller -> getUser', error);
    next(new ErrorHandler(500, error));
  }
};

export const createUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const user: IBaseUser = req.body as IBaseUser;
  try {
    const data = await userService.createUser(user);
    successHandler.handleSuccess(200, 'User created', res, next, omit(data, omitKeys));
  } catch(error) {
    logger.info('ERROR: controller -> createUser', error);
    next(new ErrorHandler(500, error));
  }
};

export const updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const update = req.body;
  const { id } = req.params;
  const criteria = {
    _id: id,
  };

  try {
    const data = await userService.updateUser(criteria, update);
    successHandler.handleSuccess(200, 'User updated', res, next, omit(data, omitKeys));
  } catch (error) {
    logger.info('ERROR: controller -> updateUser', error);
    next(new ErrorHandler(500, error));
  }
};

export const deleteUser = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const criteria = {
    _id: id
  };

  try {
    const data = await userService.deleteUser(criteria);
    if (!data) {
      throw new ErrorHandler(404, 'Object_NOT_FOUND');
    } else {
      successHandler.handleSuccess(200, 'User deleted', res, next, omit(data, omitKeys));
    }
  } catch (error) {
    logger.info('ERROR: controller -> deleteUser', error);
    next(new ErrorHandler(500, error));
  }
};
