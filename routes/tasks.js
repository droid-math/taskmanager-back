import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;