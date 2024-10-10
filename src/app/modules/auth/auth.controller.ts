import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login succesfully!',
    data: result,
  });
});

export const AuthController = {
  login,
};
