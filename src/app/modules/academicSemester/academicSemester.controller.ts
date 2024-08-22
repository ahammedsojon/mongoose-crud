import httpStatus from 'http-status';

import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created succesfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
