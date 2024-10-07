import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppErrror';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const insertIntoDB = async (payload: TSemesterRegistration) => {
  const isAcademicSemesterExist = await AcademicSemester.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found!');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration not found!',
    );
  }
  if (
    (isSemesterRegistrationExist.status === 'UPCOMING' &&
      payload.status === 'ENDED') ||
    (isSemesterRegistrationExist.status === 'ONGOING' &&
      payload.status === 'UPCOMING')
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration status invalid!',
    );
  }
  const isAcademicSemesterExist = await AcademicSemester.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found!');
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllFromDB = async (
  query: Record<string, unknown>,
): Promise<TSemesterRegistration[] | null> => {
  const data = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await data.modelQuery;
  return result;
};

const getSingleFromDB = async (
  id: string,
): Promise<TSemesterRegistration | null> => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const deleteFromDB = async (
  id: string,
): Promise<TSemesterRegistration | null> => {
  const result = await SemesterRegistration.findByIdAndDelete(id);
  return result;
};

export const SemesterRegistrationService = {
  insertIntoDB,
  updateIntoDB,
  getAllFromDB,
  getSingleFromDB,
  deleteFromDB,
};
