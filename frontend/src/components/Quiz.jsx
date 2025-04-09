import React from 'react'
import { useState } from 'react'
import '../App.css';
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import Fqr from './components/Fqr.jsx';

const Quiz = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data)
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: "Paris",
        },
        {
            question: "Which language is used for web apps?",
            options: ["Python", "JavaScript", "C", "Java"],
            correct: "JavaScript",
        },
        {
            question: "What does HTML stand for?",
            options: [
                "HyperText Markup Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language",
                "Hyper Transfer Text Marking Language",
            ],
            correct: "HyperText Markup Language",
        },
        {
            question: "Who is the founder of Microsoft?",
            options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
            correct: "Bill Gates",
        },
    ];

    const handleChange = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let count = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) count++;
        });
        setScore(count);
        setSubmitted(true);
    };

    return (
        <div>
            <Navbar data={data?.email} />
            <div className="quiz-container">
                <h2>Welcome to the Quiz!</h2>

                <form onSubmit={handleSubmit}>
                    {questions.map((q, index) => (
                        <div key={index} className="question-block">
                            <p><strong>Q{index + 1}: {q.question}</strong></p>
                            {q.options.map((opt, i) => (
                                <label key={i} className="option">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={opt}
                                        onChange={() => handleChange(index, opt)}
                                        disabled={submitted}
                                        required
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    ))}

                    {!submitted && <button type="submit">Submit Quiz</button>}
                </form>
            </div>
            <Fqr/>
           </div> )
}

            export default Quiz
