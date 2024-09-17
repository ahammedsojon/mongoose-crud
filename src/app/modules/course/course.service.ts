import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppErrror';
import httpStatus from 'http-status';

const insertIntoDB = async (payload: TCourse): Promise<TCourse> => {
  const result = await Course.create(payload);
  return result;
};

const getAllFromDB = async (
  query: Record<string, unknown>,
): Promise<TCourse[] | null> => {
  const cousrseQuery = new QueryBuilder(
    Course.find().populate('prerequisiteCourses.course'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await cousrseQuery.modelQuery;
  return result;
};

const getSingleFromDB = async (id: string): Promise<TCourse | null> => {
  const result = await Course.findById(id).populate(
    'prerequisiteCourse.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { prerequisiteCourses, ...remianingData } = payload;
  const session = await startSession();
  try {
    session.startTransaction();
    const initialUpdate = await Course.findByIdAndUpdate(id, remianingData, {
      new: true,
      runValidators: true,
      session,
    });
    if (!initialUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      let deletedPrerequisite = prerequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      let deletedPrerequisiteCourses;
      if (deletedPrerequisite.length > 0) {
        deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              prerequisiteCourses: { course: { $in: deletedPrerequisite } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
        if (!deletedPrerequisiteCourses) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Failed to deleted prerequisite courses!',
          );
        }
      }
      let newPrerequisite = prerequisiteCourses
        .filter((el) => el.course && !el.isDeleted)
        .map((el) => el.course);
      let newPrerequisiteCourses;
      if (newPrerequisite.length > 0) {
        newPrerequisiteCourses = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              prerequisiteCourses: { $each: newPrerequisite },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
        if (!deletedPrerequisiteCourses) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Failed to add prerequisite courses!',
          );
        }
      }
      session.commitTransaction();
      session.endSession();
      const result = await Course.findById(id).populate(
        'prerequisiteCourses.course',
      );
      return result;
    }
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update course!',
    );
  }
};

const deleteFromDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateCourseIntoDB,
  deleteFromDB,
};
