import { promisePool } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM usuarios');
    console.log(`Users in the database: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    res.status(500).send('Error fetching users');
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const foto = req.foto || null;
    const creationdate = new Date().toISOString().split('T')[0];
    const [result] = await promisePool.query(
      'INSERT INTO usuarios (name, password, creationdate, foto) VALUES (?, ?, ?, ?)',
      [name, password, creationdate, foto]
    );
    console.log(`Usuário [${name}] adicionado com sucesso no ID: ${result.insertId}.`);
    res.send('Usuário adicionado com sucesso');
  } catch (error) {
    console.error(`Erro ao criar usuário: ${error.message}`);
    res.status(500).send('`Erro ao criar usuário');
  }
};''

export const getUserById = async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE userid = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.send(rows[0]);
  } catch (error) {
    console.error(`Error fetching user: ${error.message}`);
    res.status(500).send('Error fetching user');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await promisePool.query('DELETE FROM usuarios WHERE userid = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    console.log(`User with id ${req.params.id} has been deleted`);
    res.send('User deleted successfully');
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).send('Error deleting user');
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, password, creationdate, foto } = req.body;
    const [result] = await promisePool.query(
      'UPDATE usuarios SET name = ?, password = ?, creationdate = ?, foto = ? WHERE userid = ?',
      [name, password, creationdate, foto, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    console.log(`User with id ${req.params.id} has been updated`);
    res.send('User updated successfully');
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).send('Error updating user');
  }
};
