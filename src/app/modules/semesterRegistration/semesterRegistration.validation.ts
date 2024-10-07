import { z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic semester is required.',
    }),
    status: z.enum([...(semesterRegistrationStatus as [string, ...string[]])], {
      required_error: 'Status is required.',
    }),
    startMonth: z
      .string({
        required_error: 'End month is required.',
      })
      .datetime(),
    endMonth: z
      .string({
        required_error: 'End month is required.',
      })
      .datetime(),
    minCredit: z.number({
      required_error: 'Min credit is required.',
    }),
    maxCredit: z.number({
      required_error: 'Max credit is required.',
    }),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startMonth: z.string().datetime().optional(),
    endMonth: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
