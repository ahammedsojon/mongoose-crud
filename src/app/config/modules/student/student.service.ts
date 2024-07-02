import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: IStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const deleteStudentFromDB = async id => {
  const result = await Student.deleteOne({ id });
  return result;
};

const getSingleStudentFromDB = async id => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
