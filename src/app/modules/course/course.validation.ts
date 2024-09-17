import { z } from 'zod';

const prerequisteCourse = z.object({
  course: z.string(),
  isDelted: z.boolean(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be string',
      required_error: 'Title is required.',
    }),
    prefix: z.string({
      invalid_type_error: 'Prefix must be string',
      required_error: 'Prefix is required.',
    }),
    code: z.number({
      invalid_type_error: 'Code must be number',
      required_error: 'Code is required.',
    }),
    credits: z.number({
      invalid_type_error: 'Credits must be number',
      required_error: 'Credits is required.',
    }),
    prerequisiteCourses: z.array(prerequisteCourse).optional(),
  }),
});

const udpateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    prerequisiteCourses: z.array(prerequisteCourse).optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
};
