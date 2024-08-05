// src/components/UserComponent.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserComponent.css';

const UserComponent: React.FC = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quizzes');
            setQuizzes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div className="user-container">
            <h2>Available Quizzes</h2>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-item">
                    <p>{quiz.title}</p>
                    <button onClick={() => window.location.href = `/quiz/${quiz.id}`}>
                        Start Quiz
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserComponent;
