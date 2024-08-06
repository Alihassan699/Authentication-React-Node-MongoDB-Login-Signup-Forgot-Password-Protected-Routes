import { pool } from '../config/db.js';

const createQuiz = async (req, res, next) => {
  const { questions } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO quizzes (questions) VALUES ($1) RETURNING *',
      [questions]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating quiz:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

const getQuizzes = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM quizzes');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error getting quizzes:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

const updateQuiz = async (req, res, next) => {
  const { id } = req.params;
  const { questions } = req.body;
  try {
    const result = await pool.query(
      'UPDATE quizzes SET questions = $1 WHERE id = $2 RETURNING *',
      [questions, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating quiz:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

const deleteQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting quiz:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

export { createQuiz, getQuizzes, updateQuiz, deleteQuiz };
