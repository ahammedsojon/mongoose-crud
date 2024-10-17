import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppErrror';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from './catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    const { userId, role, iat } = decoded as JwtPayload;
    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

    const userExist = await User.findOne({ id: userId }).select('+password');
    if (
      userExist?.passwordChangedAt &&
      iat &&
      new Date(userExist.passwordChangedAt).getTime() / 1000 > iat
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
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
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
