import React, { useState } from "react";
import "./Survey.css";
import { data } from "../../assets/data";

const Survey = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [selected, setSelected] = useState(null);

  const handleAnswerClick = (i, e) => {
    setSelected(i);
  };

  return (
    <div className="app">
      <div className="title-container">
        <h1 className="title-container">Not-Too-Dumb Phone Survey</h1>
      </div>
      <div className="container">
        <h2>
          {index + 1}. {question.question}
        </h2>
        <ul>
          {question.answers.map((answer, i) => (
            <li
              key={i}
              className={selected === i ? "selected" : ""}
              onClick={(e) => handleAnswerClick(i)}
            >
              {answer.text}
            </li>
          ))}
        </ul>
        <button>Next</button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div>
      </div>
    </div>
  );
};

export default Survey;
