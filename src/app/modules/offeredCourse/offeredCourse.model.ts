import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
