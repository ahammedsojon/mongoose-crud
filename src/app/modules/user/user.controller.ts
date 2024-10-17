import httpStatus from 'http-status';

import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body.data;

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrived succesfully.',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const result = await UserServices.changeStatus(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status changed succesfully.',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  changeStatus,
  getMe,
};
