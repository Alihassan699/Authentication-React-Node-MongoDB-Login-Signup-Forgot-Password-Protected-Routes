// src/components/AdminComponent.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminComponent.css';

const AdminComponent: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
    const [allQuestions, setAllQuestions] = useState<any[]>([]);

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/questions');
            setAllQuestions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/questions', { statement: question, options, correct_answer: correctAnswer });
            setMessage('Question added successfully');
            fetchAllQuestions(); // Refresh the question list
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
        } catch (error) {
            setMessage('Error adding question');
            console.error(error);
        }
    };

    const handleCreateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/quizzes', { questions: selectedQuestions });
            setMessage('Quiz created successfully');
            setQuizTitle('');
            setSelectedQuestions([]);
        } catch (error) {
            setMessage('Error creating quiz');
            console.error(error);
        }
    };

    return (
        <div className="admin-container" style={{ width: '500px' }} >
            <h2>Add New Question</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddQuestion}>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <button type="submit">Add Question</button>
            </form>

            <h2>Create New Quiz</h2>
            <form onSubmit={handleCreateQuiz}>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
                <h3>Select Questions:</h3>
                {allQuestions.map((q, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            value={q.id}
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                if (e.target.checked) {
                                    setSelectedQuestions([...selectedQuestions, id]);
                                } else {
                                    setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
                                }
                            }}
                        />
                        <label>{q.statement}</label>
                    </div>
                ))}
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default AdminComponent;
