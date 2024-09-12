import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required.',
    }),
    academicDepartment: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Academic department is required.',
    }),
  }),
});

export const AcademicDeparmentValidation = {
  academicDepartmentValidationSchema,
};
