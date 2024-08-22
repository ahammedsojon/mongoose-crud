export type TMonth = 'January' | 'February';

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export interface IAcademicSemester {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
}
