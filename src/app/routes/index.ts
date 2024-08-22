import { Router } from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
