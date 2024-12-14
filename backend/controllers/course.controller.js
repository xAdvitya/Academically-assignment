import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

//getting all the courses
export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({});
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to get courses" });
  }
};

//adding the courses if the user is admin
export const addCourse = async (req, res) => {
  // Ensure the user is an admin
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can add courses!" });
  }

  const { title, description, duration, instructor } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        duration,
        instructor,
      },
    });
    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add course" });
  }
};

//gettting a particular course
export const getCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "failed to return course" });
  }
};

//deleting a course
export const deleteCourse = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can delete courses!" });
  }

  const id = req.params.id;

  try {
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    await prisma.course.delete({ where: { id } });

    return res.status(200).json({ message: "course deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete course" });
  }
};

//update the course based on id
export const updateCourse = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Only admins can update courses!" });
  }

  const id = req.params.id;
  const courseData = req.body;

  try {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: courseData,
    });

    return res.status(200).json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "cannot update course!" });
  }
};

//enrolling a user in a course

export const enrollCourse = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    const userId = req.userId;
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    user.enrolledCourses.push(courseId);

    await prisma.user.update({
      where: { userId },
      data: {
        enrolledCourses: user.enrolledCourses,
      },
    });

    res.status(200).json({ message: "enrolled in course" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "cannot enroll" });
  }
};
