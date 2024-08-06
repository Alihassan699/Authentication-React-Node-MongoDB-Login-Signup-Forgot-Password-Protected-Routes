import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserComponent.css';

const UserComponent: React.FC = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]); // Ensure initial state is an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quizzes');
            if (Array.isArray(response.data)) {
                setQuizzes(response.data);
            } else {
                setError('Unexpected response data format');
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching quizzes');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
