import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonth,
} from './academeicSemester.interface';

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const Month: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type TAcademicSemeserNameCodeMapper = {
  [key: string]: string;
};

export const academeicSemesterNameCodeMapper: TAcademicSemeserNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
