import { promisePool } from '../db.js';

export const createTask = async (req, res) => {
    const { name, description, owner, priority } = req.body;
    const startDate = new Date().toISOString().split('T')[0];
    try {
      const result = await promisePool.query('INSERT INTO tarefas (name, description, owner, priority, status, startDate) VALUES (?, ?, ?, ?, ?, ?)', [name, description, owner, priority, 0, startDate]);
      res.status(201).json({ id: result.insertId, description, owner, ownerName, status, startDate });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error creating task' });
    }
  };
export const getTasks = async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM tarefas');
        console.log(`Tasks in the database: ${JSON.stringify(rows, null, 2)}`);
        res.send(rows);
      } catch (error) {
        console.error(`Error fetching tasks: ${error.message}`);
        res.status(500).send('Error fetching tasks');
      }
  };
  
  // Controller para obter uma tarefa pelo ID
  export const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
      const task = await promisePool.query('SELECT * FROM tarefas WHERE id = ?', [taskId]);
      if (task.length === 0) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task[0]);
      }
    } catch (error) {
      console.error('Error getting task by ID:', error);
      res.status(500).json({ error: 'Error getting task by ID' });
    }
  };
  
  // Controller para deletar uma tarefa
  export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
      await promisePool.query('DELETE FROM tarefas WHERE id = ?', [taskId]);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  };
  
  // Controller para atualizar uma tarefa
  export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { description, owner, ownerName, status, startDate } = req.body;
    try {
      await promisePool.query('UPDATE tarefas SET description = ?, owner = ?, ownerName = ?, status = ?, startDate = ? WHERE id = ?', [description, owner, ownerName, status, startDate, taskId]);
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  };