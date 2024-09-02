import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    pasword: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required.',
    }),
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
