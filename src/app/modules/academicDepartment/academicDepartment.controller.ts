import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDeaprtment.service';

const createIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created succesfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments is retrived succesfully.',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrived succesfully.',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.deleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department has been deleted succesfully.',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department has been updated succesfully.',
    data: result,
  });
});

export const AcademicFacultyController = {
  createIntoDB,
  getAll,
  getSingle,
  deleteFromDB,
  updateIntoDB,
};
