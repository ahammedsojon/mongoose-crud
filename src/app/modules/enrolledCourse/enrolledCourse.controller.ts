import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const enroll = catchAsync(async (req, res) => {
  const result = await EnrolledCourseService.enroll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled into the course successfully!',
    data: result,
  });
});

export const EnrolledCourseController = {
  enroll,
};
