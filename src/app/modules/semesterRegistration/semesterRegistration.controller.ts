import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semsterRegistration.service';

const create = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is created succesfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registrations is retrived succesfully.',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getSingleFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is retrived succesfully.',
    data: result,
  });
});

const deleteData = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.deleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration has been deleted succesfully.',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.updateIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration has been updated succesfully.',
    data: result,
  });
});

export const SemesterRegistrationController = {
  create,
  getAll,
  getSingle,
  deleteData,
  update,
};
