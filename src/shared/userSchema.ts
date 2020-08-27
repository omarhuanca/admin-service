import Joi from '@hapi/joi';

export const userSchema = Joi.object().keys({
  status: Joi.boolean().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  tokenPassword: Joi.string(),
  fullname: Joi.string().required().min(3).max(70),
  address: Joi.string().required().min(3).max(70),
  pictureKey: Joi.string(),
  pictureKeyLow: Joi.string(),
});