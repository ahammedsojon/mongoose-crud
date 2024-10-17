import { Router } from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CourseRoute } from '../modules/course/course.route';
import { EnrolledCourseRoute } from '../modules/enrolledCourse/enrolledCourse.route';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';
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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registrations',
    route: CourseRoute,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
