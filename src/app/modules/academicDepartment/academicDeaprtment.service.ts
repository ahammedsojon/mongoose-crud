import { AcademicDepartment } from './academicDeaprtment.model';
import { IAcademicDepartment } from './academicDepartmentInteface';

const createIntoDB = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

const getAll = async (): Promise<IAcademicDepartment[] | null> => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingle = async (id: string): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const deleteFromDB = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createIntoDB,
  getAll,
  getSingle,
  deleteFromDB,
  updateIntoDB,
};
