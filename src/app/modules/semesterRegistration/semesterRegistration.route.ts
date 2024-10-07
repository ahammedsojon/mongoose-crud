import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get('/:id', SemesterRegistrationController.getSingle);
router.get('/', SemesterRegistrationController.getAll);
router.post(
  '/',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.create,
);
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.update,
);
router.delete('/:id', SemesterRegistrationController.deleteData);

export const AcademicDepartmentRoute = router;
