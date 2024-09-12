import { model, Schema } from 'mongoose';
import { IAcademicDepartment } from './academicDepartmentInteface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name });
  if (isExist) {
    throw new Error('Academic Department already exist!');
  }
  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
