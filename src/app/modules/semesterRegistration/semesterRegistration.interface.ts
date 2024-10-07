import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startMonth: Date;
  endMonth: Date;
  minCredit: number;
  maxCredit: number;
};
