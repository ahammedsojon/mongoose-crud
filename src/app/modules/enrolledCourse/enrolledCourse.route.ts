import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseController } from './enrolledCourse.controller';
import { EnrolledCourseValidation } from './enrolledCourse.validation';

const router = express.Router();
router.post(
  '/',
  auth('student'),
  validateRequest(EnrolledCourseValidation.enrollValidationSchema),
  EnrolledCourseController.enroll,
);

export const EnrolledCourseRoute = router;
