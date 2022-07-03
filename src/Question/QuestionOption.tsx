import React, { useEffect, useState } from "react";
import "./Question.css";
import { Question } from "../models/model";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface Props {
  questions: Question[];
  currentQuestion: number;
  score: number;
  setScore: (score: number) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
}

const QuestionOption: React.FC<Props> = ({
  questions,
  currentQuestion,
  score,
  setScore,
  setCurrentQuestion,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const incorrectAnswers = questions[currentQuestion].incorrect_answers;
  const correctAnswer = questions[currentQuestion].correct_answer;
  useEffect(() => {
    const shuffleOptions = [...incorrectAnswers, correctAnswer]
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
    setOptions(shuffleOptions);
    // eslint-disable-next-line
  }, [currentQuestion, questions]);

  const handleClick = (option: string) => {
    setSelected(option);
    if (option === correctAnswer) setScore(score + 1);
    setError(false);
  };

  const history = useHistory();

  const handleNext = () => {
    if (selected === "") setError(true);
    else if (currentQuestion === 9) history.push("/result");
    else {
      setSelected("");
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const getClassName = (option: string) => {
    if (selected !== "") {
      if (option === selected) {
        if (selected === correctAnswer) return "correct";
        return "wrong";
      }
      if (option === correctAnswer) return "correct";
    }
  };
  return (
    <>
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        Question {currentQuestion + 1} :
      </span>
      <div className="question-option-container">
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          {questions[currentQuestion].question}
        </span>
        {error && <ErrorMessage>Please Select An Option First</ErrorMessage>}
        <div className="options">
          {options.map((option) => {
            return (
              <button
                key={option}
                onClick={(e) => handleClick(option)}
                disabled={selected !== ""}
                className={`singleOption ${getClassName(option)} `}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="controls">
          <Button
            style={{ width: 185 }}
            variant="contained"
            color="secondary"
            href="/"
          >
            QUIT
          </Button>
          <Button
            style={{ width: 185 }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {currentQuestion === 9 ? "SUBMIT" : "NEXT QUESTION"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuestionOption;
