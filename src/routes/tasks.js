import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// Main page
router.get('/', taskController.getIndex);

// Create a new task
router.post('/', taskController.createTask);

// Toggle task completion
router.post('/:id/toggle', taskController.toggleTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

// Get tasks for modal
router.get('/modal', taskController.getTasksForModal);

export default router;
