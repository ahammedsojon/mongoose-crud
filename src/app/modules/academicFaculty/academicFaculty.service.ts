import { AcademicFaculty } from './academicFaculty.model';
import { IAcademicFaculty } from './academicFacultyInteface';

const createIntoDB = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getAll = async (): Promise<IAcademicFaculty[] | null> => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingle = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const deleteFromDB = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createIntoDB,
  getAll,
  getSingle,
  deleteFromDB,
  updateIntoDB,
};
