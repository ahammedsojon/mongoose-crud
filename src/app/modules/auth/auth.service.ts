import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppErrror';
import { User } from '../user/user.model';
import { IUser } from './auth.interface';
import { createToken } from './auth.utils';

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

  // check if user blocked
  const isBlocked = isUserExist?.status;
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const jwtPayload = {
    userId: payload?.id,
    role: isUserExist?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiry as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiry as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  passwordData: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const { userId, role } = userData as JwtPayload;
  const { oldPassword, newPassword } = passwordData;
  // check if user exist
  const isUserExist = await User.findOne({ id: userId }).select('+password');
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
    oldPassword,
    isUserExist?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match!");
  }

  // check if user blocked
  const isBlocked = isUserExist?.status;
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    { id: userId, role: role },
    {
      password: hashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return result;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string);
  const { userId, role } = decoded as JwtPayload;
  // check if user exist
  const isUserExist = await User.findOne({ id: userId }).select('+password');
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if user deleted
  const isDeleted = isUserExist?.isDeleted;
  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  // check if user blocked
  const isBlocked = isUserExist?.status;
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }
  const jwtPayload = {
    userId,
    role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiry as string,
  );
  return { accessToken };
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
