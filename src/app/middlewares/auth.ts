import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppErrror';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from './catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    jwt.verify(token, config.jwt_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      if (
        requiredRoles &&
        !requiredRoles.includes((decoded as JwtPayload).role)
      )
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

      req.user = decoded as JwtPayload;

      next();
    });
  });
};

export default auth;
