import { Response, NextFunction } from 'express';

class SuccessHandler {

  public handleSuccess(statusCode: number, message: string, res: Response, next: NextFunction, data: any) {
    res.status(statusCode).send({
      status: 'success',
      statusCode,
      message,
      data: data ? data : null
    });
  }
}

export default SuccessHandler;
