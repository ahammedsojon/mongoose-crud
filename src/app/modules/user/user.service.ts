import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppErrror';
import { sendImageToClodinary } from '../../utils/sendImageToCoudianry';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
const createStudentIntoDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set student email
  userData.email = payload?.email;

  const academeicSemester = await AcademicSemester.findById(
    payload?.academicSemester,
  );
  if (!academeicSemester) {
    throw new Error('Academic Semester not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set manually generated it
    userData.id = await generateStudentId(academeicSemester);
    const fileName = `${userData.id}-${payload.name.firstName}`;
    const filePath = file?.path;

    // send image to cloudinary
    const { secure_url } = await sendImageToClodinary(fileName, filePath);

    // create a user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new Error('Failed to create user!');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = secure_url;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new Error('Failed to create student!');
    }
    session.commitTransaction();
    session.endSession();
    return newStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
  }
};

const changeStatus = async (id: string, payload: { status: string }) => {
  // check if user exist
  const isUserExist = await User.findById({ id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if user deleted
  const isDeleted = isUserExist?.isDeleted;
  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  // check if user blocked
  const isBlocked = isUserExist?.status;
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const result = await User.findByIdAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getMe = async (user: JwtPayload) => {
  // check if user exist
  const isUserExist = await User.findOne({ id: user?.id, role: user?.role });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if user deleted
  const isDeleted = isUserExist?.isDeleted;
  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  // check if user blocked
  const isBlocked = isUserExist?.status;
  if (isBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }
  return isUserExist;
};

export const UserServices = {
  createStudentIntoDB,
  changeStatus,
  getMe,
};
