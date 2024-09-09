import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

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

    // create a user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new Error('Failed to create user!');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

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

export const UserServices = {
  createStudentIntoDB,
};
