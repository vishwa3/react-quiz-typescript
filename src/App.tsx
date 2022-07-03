import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import "./App.css";
import axios from "axios";
import { Question } from "./models/model";
import Quiz from "./Quiz/Quiz";
import Result from "./Result/Result";

function App() {
  const [name, setName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
    console.log("results", data.results);
  };
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quiz" exact>
            <Quiz
              name={name}
              score={score}
              setScore={setScore}
              questions={questions}
            />
          </Route>
          <Route path="/result" exact>
            <Result score={score} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
