import config from '../../config';
import { AcademicSemesterService } from '../academicSemester/academicSemester.service';
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

  const academeicSemester = await AcademicSemesterService.getAcademicSemester(
    payload.id,
  );
  if (!academeicSemester) {
    throw new Error('Academic Semester not found!');
  }

  const studentId = await generateStudentId(academeicSemester);

  //set manually generated it
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
