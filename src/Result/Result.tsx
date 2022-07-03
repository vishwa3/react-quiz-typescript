import { Button } from "@material-ui/core";
import React from "react";
import "./Result.css";

interface Props {
  score: number;
}

const Result: React.FC<Props> = ({ score }) => {
  return (
    <div className="result">
      <span className="title"> FINAL SCORE : {score}</span>
      <Button variant="contained" color="secondary" size="large" href="/">
        GO TO HOMEPAGE
      </Button>
    </div>
  );
};

export default Result;
