import { pool } from '../config/db.js';

const addQuestion = async (req, res, next) => {
  const { statement, options, correct_answer } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO questions (statement, options, correct_answer) VALUES ($1, $2, $3) RETURNING *',
      [statement, options, correct_answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    res.status(200).json(result.rows);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

const updateQuestion = async (req, res, next) => {
  const { id } = req.params;
  const { statement, options, correct_answer } = req.body;
  try {
    const result = await pool.query(
      'UPDATE questions SET statement = $1, options = $2, correct_answer = $3 WHERE id = $4 RETURNING *',
      [statement, options, correct_answer, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

const deleteQuestion = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM questions WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
};

export { addQuestion, getQuestions, updateQuestion, deleteQuestion };
