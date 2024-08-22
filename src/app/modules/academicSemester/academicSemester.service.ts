import { IAcademicSemester } from './academeicSemester.interface';
import { academeicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (academeicSemesterNameCodeMapper[payload.name] != payload.code) {
    throw new Error('Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
};
