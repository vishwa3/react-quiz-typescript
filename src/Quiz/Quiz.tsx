import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Question } from "../models/model";
import QuestionOption from "../Question/QuestionOption";
import "./Quiz.css";

interface Props {
  name: string;
  score: number;
  setScore: (score: number) => void;
  questions: Question[];
}

const Quiz: React.FC<Props> = ({ name, score, setScore, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  return (
    <div className="question-container">
      <span className="subtitle">Welcome, {name}</span>
      {questions.length === 0 ? (
        <CircularProgress
          color="inherit"
          size={150}
          thickness={1}
          style={{ margin: 100 }}
        />
      ) : (
        <>
          <div className="quiz-details">
            <span>{questions[currentQuestion].category}</span>
            <span>SCORE : {score}</span>
          </div>

          <QuestionOption
            questions={questions}
            currentQuestion={currentQuestion}
            score={score}
            setScore={setScore}
            setCurrentQuestion={setCurrentQuestion}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
