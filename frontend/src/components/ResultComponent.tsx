// src/components/ResultComponent.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ResultComponent.css';

const ResultComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/quizzes/${id}/result`)
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!result) return <div>Loading...</div>;

    return (
        <div className="result-container">
            <h2>Quiz Results</h2>
            <p>Total Questions: {result.totalQuestions}</p>
            <p>Correct Answers: {result.correctAnswers}</p>
            <p>Your Score: {result.score}</p>
        </div>
    );
};

export default ResultComponent;
