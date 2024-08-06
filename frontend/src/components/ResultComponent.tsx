import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResultComponent = ({ quizId }: { quizId: number }) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`/api/quizzes/${quizId}/results`);
                setResult(response.data);
            } catch (error) {
                console.error("Error fetching result", error);
            }
        };

        fetchResult();
    }, [quizId]);

    if (!result) return <div>Loading...</div>;

    return (
        <div>
            <div>Total Questions: {result.total_questions}</div>
            <div>Attempted Questions: {result.attempted_questions}</div>
            <div>Correct Answers: {result.correct_answered}</div>
            <div>Wrong Answers: {result.wrong_answered}</div>
        </div>
    );
};

export default ResultComponent;
