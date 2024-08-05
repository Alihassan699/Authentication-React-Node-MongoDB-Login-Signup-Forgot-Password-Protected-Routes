// src/components/QuizComponent.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/QuizComponent.css';

const QuizComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/quizzes/${id}/questions`)
            .then(response => {
                const shuffledQuestions = response.data.sort(() => Math.random() - 0.5);
                setQuestions(shuffledQuestions);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleNextQuestion = () => {
        if (!selectedOption) {
            setMessage('Please select an option.');
            return;
        }
        setMessage('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
    };

    const handleSubmitQuiz = () => {
        if (!selectedOption) {
            setMessage('Please select an option.');
            return;
        }
        setMessage('');
        // Submit quiz logic here
        navigate('/result');
    };

    return (
        <div className="quiz-container">
            {questions.length > 0 && (
                <>
                    <h2>{questions[currentQuestionIndex].statement}</h2>
                    {questions[currentQuestionIndex].options.map((option: string, index: number) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label>{option}</label>
                        </div>
                    ))}
                    {message && <p>{message}</p>}
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={handleNextQuestion}>Next</button>
                    ) : (
                        <button onClick={handleSubmitQuiz}>Submit</button>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizComponent;
