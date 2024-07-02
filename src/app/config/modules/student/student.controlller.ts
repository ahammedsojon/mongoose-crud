import { StudentService } from './student.service';

const createStudent = async (req, res) => {
  const studentData = req.body;
  const result = await StudentService.createStudentIntoDB(studentData);
  res.status(201).json({
    status: 201,
    message: 'Student created successfully.',
    data: result,
  });
};

const getAllStudents = async (req, res) => {
  const studentData = req.body;
  const result = await StudentService.getAllStudentsFromDB(studentData);
  res.status(200).json({
    status: 200,
    message: 'Students are retrieved successfully.',
    data: result,
  });
};

const getSingleStudent = async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);
  res.status(200).json({
    status: 200,
    message: 'Student is retrieved successfully.',
    data: result,
  });
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);
  res.status(200).json({
    status: 200,
    message: 'Student deleted successfully.',
    data: result,
  });
};

export const StudnetController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
