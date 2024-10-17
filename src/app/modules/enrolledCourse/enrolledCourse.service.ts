import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppErrror';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';

const enroll = async (userId: string, payload: TEnrolledCourse) => {
  const student = await Student.findOne({ id: userId }).select('_id');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }

  const isOfferedCourseExist = await OfferedCourse.findById(
    payload.offeredCourse,
  );

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course doesn't exist");
  }

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.CONFLICT, 'Room is full!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse: payload.offeredCourse,
    student: student._id,
  });

  if (!isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student already enrolled!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: payload.offeredCourse,
          course: isOfferedCourseExist.course,
          student: student._id,
          faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (result.length === 0) {
      throw new AppError(httpStatus.CONFLICT, 'Failed to enroll course!');
    }

    await OfferedCourse.findByIdAndUpdate(
      payload.offeredCourse,
      {
        maxCapacity: isOfferedCourseExist.maxCapacity - 1,
      },
      { session },
    );

    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error!',
    );
  }
};

export const EnrolledCourseService = {
  enroll,
};
