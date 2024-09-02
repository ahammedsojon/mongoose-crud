import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';

const createIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created succesfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties is retrived succesfully.',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrived succesfully.',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.deleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty has been deleted succesfully.',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.updateIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty has been updated succesfully.',
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
