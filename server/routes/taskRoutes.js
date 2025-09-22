const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  })
);

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { title, description, assignedTo } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      user: req.user.id,
    });

    res.status(201).json(task);
  })
);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
router.put(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure the logged in user is the owner of the task
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  })
);

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure the logged in user is the owner of the task
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Task removed' });
  })
);

module.exports = router;