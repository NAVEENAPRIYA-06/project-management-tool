const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  })
);

router.post(
  '/',
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
    });
    res.status(201).json(task);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task removed' });
  })
);

module.exports = router;