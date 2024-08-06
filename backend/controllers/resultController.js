import { pool } from '../config/db.js';

const submitQuiz = async (req, res, next) => {
  const { userId, quizId, answers } = req.body;
  try {
    const quiz = await pool.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
    const questions = quiz.rows[0].questions;

    let correctAnswered = 0;
    let attempted = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswered += 1;
      }
      attempted += 1;
    });

    const result = await pool.query(
      'INSERT INTO results (user_id, quiz_id, total_questions, attempted, correct_answered) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, quizId, questions.length, attempted, correctAnswered]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error submitting quiz:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

const getResultsByQuizId = async (req, res, next) => {
  const { quizId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM results WHERE quiz_id = $1', [quizId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error getting results by quiz ID:', err); // Log the error
    next(err); // Pass the error to the error-handling middleware
  }
};

export { submitQuiz, getResultsByQuizId };
