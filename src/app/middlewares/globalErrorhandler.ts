/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorScources } from '../interfaces/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorScources = [
    {
      path: '',
      message: err.message || 'Somtning went wrong!',
    },
  ];
  const handleZodError = () => {
    statusCode = 400;
    message = 'Validation Error';
    const errorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path.pop(),
        message: issue?.message,
      };
    });
    return {
      statusCode,
      message,
      errorSources,
    };
  };
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError();
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
