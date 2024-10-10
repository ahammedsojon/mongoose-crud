import httpStatus from 'http-status';
import AppError from '../../errors/AppErrror';
import { User } from '../user/user.model';
import { IUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: IUser) => {
  const { id, password } = payload;
  // check if user exist
  const isUserExist = await User.findOne({ id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if user deleted
  const isDeleted = isUserExist?.isDeleted;
  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  // check if user deleted
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match!");
  }
  const jwtPayload = {
    userId: payload?.id,
    role: isUserExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '1h',
  });
  return { accessToken, needsPasswordChange: isUserExist?.needsPasswordChange };
};

export const AuthService = {
  loginUser,
};
