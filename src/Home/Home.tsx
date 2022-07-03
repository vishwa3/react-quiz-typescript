import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./Home.css";
import Categories from "../Categories";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useHistory } from "react-router-dom";

interface Props {
  name: String;
  setName: (name: string) => void;
  fetchQuestions: (category: string, difficulty: string) => void;
}

const Home: React.FC<Props> = ({ name, setName, fetchQuestions }: Props) => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();
  const handleSubmit = () => {
    if (name === "" || category === "" || difficulty === "") {
      setError(true);
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="home">
      <div className="settings">
        <div className="quiz_settings">
          <span style={{ textAlign: "center", fontSize: 30 }}>
            Quiz Settings
          </span>
          {error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}

          <TextField
            id="enter-your-name"
            label="Enter Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="select-category"
            select
            label="Select Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="select-difficulty"
            select
            label="Select Difficulty"
            variant="outlined"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="/quiz.svg" alt="home" className="banner" />
    </div>
  );
};

export default Home;
