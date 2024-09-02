import { model, Schema } from 'mongoose';
import { IAcademicFaculty } from './academicInteface';

const academicFacultySchema = new Schema<IAcademicFaculty>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({ name: this.name });
  console.log('====================================');
  console.log(this.name);
  console.log(isExist);
  console.log('====================================');
  if (isExist) {
    throw new Error('Academic Faculty already exist!');
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
