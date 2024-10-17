import { z } from 'zod';

const enrollValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course is required.',
    }),
  }),
});

export const EnrolledCourseValidation = {
  enrollValidationSchema,
};
