//All APIS COME HERE
const express = require('express')
const asyncHandler = require('express-async-handler')
const Course = require('../models/course')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

//Get All Courses
router.get('/', verifyToken, asyncHandler(async (req, res) => {
  const courses = await Course.find({})
  res.json(courses)
}))

//Get a Specific Course
router.get('/:id', verifyToken, asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    return res.json(course)
  } else {
    res.status(404)
    throw new Error('Course Cannot Be Found')
  }
}))

//Add a New Course
router.post('/add', verifyToken, asyncHandler(async (req, res) => {

  const course = new Course({
    name: req.body.name,
    link: req.body.link,
    platform: req.body.platform,
    description: req.body.description,
    isCompleted: req.body.isCompleted
  });
  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
}))

//Update Specific Course
router.post('/update/:id', verifyToken, asyncHandler(async (req, res) => {

  const {
    name,
    link,
    platform,
    description,
    isCompleted
  } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.name = name;
    course.link = link;
    course.platform = platform;
    course.description = description;
    course.isCompleted = isCompleted;

    const updatedCourse = await course.save();

    res.status(201).json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course Not Found");
  }

}))

//Delete a Specific Course
router.delete('/delete/:id', asyncHandler(async (req, res) => {

  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: "Course Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
}))

module.exports = router