import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/auth.js';
import { taskValidation, validate } from '../utils/validators.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, validate, createTask);

router.get('/stats', getTaskStats);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;