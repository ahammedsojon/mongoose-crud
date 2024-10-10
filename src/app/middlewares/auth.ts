import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import AppError from '../errors/AppErrror';
import httpStatus from 'http-status';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from './catchAsync';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    jwt.verify(token, config.jwt_secret as string, (err, decode) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      req.user = decode as JwtPayload;

      next();
    });
  });
};

export default auth;
