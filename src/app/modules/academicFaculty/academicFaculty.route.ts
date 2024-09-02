import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.getAll);
router.get('/:id', AcademicFacultyController.getSingle);
router.post(
  '/',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.createIntoDB,
);
router.patch('/:id', AcademicFacultyController.updateIntoDB);
router.delete('/:id', AcademicFacultyController.deleteFromDB);

export const AcademicFacultyRoute = router;
