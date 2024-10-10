import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicDepartment.controller';
import { AcademicDeparmentValidation } from './academicDepartment.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), AcademicFacultyController.getAll);
router.get('/:id', AcademicFacultyController.getSingle);
router.post(
  '/',
  validateRequest(
    AcademicDeparmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicFacultyController.createIntoDB,
);
router.patch('/:id', AcademicFacultyController.updateIntoDB);
router.delete('/:id', AcademicFacultyController.deleteFromDB);

export const AcademicDepartmentRoute = router;
