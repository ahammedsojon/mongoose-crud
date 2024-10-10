import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Id is required.',
    }),
    academicDepartment: z.string({
      required_error: 'Password is required.',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
