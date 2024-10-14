import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login succesfully!',
    data: { accessToken, needsPasswordChange },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login succesfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token retrived successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthService.forgetPassword(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link has been generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password has been reset successfully!',
    data: result,
  });
});

export const AuthController = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
