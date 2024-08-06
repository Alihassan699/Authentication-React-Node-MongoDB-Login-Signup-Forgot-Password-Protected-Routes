import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizComponent = ({ quizId }: { quizId: number }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/api/quizzes/${quizId}/questions`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions", error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/quizzes/${quizId}/results`, {
                userId: 1, // Replace with actual user ID
                quizId,
                totalQuestions: questions.length,
                attemptedQuestions: answers.length,
                correctAnswered: answers.filter(answer => answer === "correct").length, // Replace with actual logic
                wrongAnswered: answers.filter(answer => answer === "wrong").length, // Replace with actual logic
            });
            console.log("Result saved:", response.data);
        } catch (error) {
            console.error("Error saving result", error);
        }
    };

    if (currentQuestionIndex >= questions.length) {
        return <button onClick={handleSubmit}>Submit</button>;
    }

    return (
        <div>
            <div>{questions[currentQuestionIndex].statement}</div>
            {questions[currentQuestionIndex].options.map((option: string, index: number) => (
                <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
        </div>
    );
};

export default QuizComponent;
