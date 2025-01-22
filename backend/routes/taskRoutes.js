const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tasks = require('../models/task.js');

const router = express.Router();


router.post('/tasks', async (req, res) => {
    const { title, status,description, date } = req.body;
    const newTask = new Tasks({ title,status,description, date });
    try {
      await newTask.save();
      res.status(201).json(newTask);
      res.send({ message: 'Task added successfully' });
    } catch (error) {
      res.status(409).json({ message:" Invalid task data" });
    }
  });
  
  router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Tasks.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(404).json({ message: "Task not found" });
    }
  });
  router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { task, description, date,status,priority } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
    const updatedTask = { task, description, date,status,priority, _id: id };
    await Tasks.findByIdAndUpdate(id, updatedTask, { new: true });
    res.json(updatedTask);
    }
    );

    router.delete('/tasks/:id', async (req, res) => {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No task with that id');
        }
    
        try {
            await Tasks.findByIdAndDelete(id);
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting task');
        }
    });


    module.exports = router;

