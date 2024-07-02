import express from 'express';
import { StudnetController } from './student.controlller';

const router = express.Router();

router.get('/', StudnetController.getAllStudents);
router.get('/:studentId', StudnetController.getSingleStudent);
router.post('/create', StudnetController.createStudent);
router.delete('/:studentId', StudnetController.deleteStudent);

export const StudentRoute = router;
