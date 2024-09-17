import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getSingleFromDB);
router.post(
  '/',
  validateRequest(
    AcademicDeparmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicFacultyController.createIntoDB,
);
router.patch('/:id', AcademicFacultyController.updateIntoDB);
router.delete('/:id', AcademicFacultyController.deleteFromDB);

export const CourseRoute = router;
