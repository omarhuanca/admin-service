import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  status: boolean,
  email: string,
  password: string,
  tokenPassword: string,
  fullname: string,
  address: string,
  phoneNumber: string,
  pictureKey: string,
  pictureKeyLow: string,
  rol: string,
};

const UserSchema = new Schema(
  {
    status: { type: Boolean, required: true, default: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokenPassword: { type: String },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pictureKey: { type: String },
    pictureKeyLow: { type: String },
    rol: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>('User', UserSchema, 'user');

export default UserModel;
