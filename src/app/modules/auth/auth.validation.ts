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

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required.',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required.',
    }),
    newPassword: z.string({
      required_error: 'New password is required.',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
