import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getSingleFromDB);
router.post(
  '/',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.insertIntoDB,
);
router.patch(
  '/',
  validateRequest(CourseValidation.udpateCourseValidationSchema),
  CourseController.updateCourseIntoDB,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.courseFacultyValidation),
  CourseController.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.courseFacultyValidation),
  CourseController.removeFaculties,
);
router.delete('/:id', CourseController.deleteFromDB);

export const CourseRoute = router;
