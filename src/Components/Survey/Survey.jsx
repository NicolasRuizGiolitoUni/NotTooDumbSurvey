import React, { useState } from "react";
import "./Survey.css";
import { data } from "../../assets/data";
import {
  MultipleChoiceQuestion,
  OpenEndedQuestion,
  CheckboxQuestion,
} from "./QuestionTypes";

const Survey = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null); // For single selection
  const [openEndedAnswers, setOpenEndedAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]); // For multiple checkboxes

  const handleAnswerClick = (i) => {
    setSelected(i); // For multiple choice question
  };

  const handleAnswerChange = (value) => {
    setOpenEndedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  const handleCheckboxChange = (i) => {
    if (selectedOptions.includes(i)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== i)); // Deselect
    } else {
      setSelectedOptions([...selectedOptions, i]); // Select
    }
  };

  const isButtonDisabled = () => {
    const currentQuestion = data[index];
    switch (currentQuestion.type) {
      case "multiple":
        return selected === null;
      case "open":
        // Retrieve the answer for the current question index or use an empty string if not present
        const currentAnswer = openEndedAnswers[index] || "";
        return currentAnswer.trim() === "";
      case "checkbox":
        return selectedOptions.length === 0;
      default:
        return true;
    }
  };

  const next = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < data.length) {
        // Reset state for the new question type
        const newQuestion = data[newIndex];
        switch (newQuestion.type) {
          case "multiple":
            setSelected(null); // Reset selected option for multiple choice questions
            break;
          case "open":
            // Ensure previous answer for this index is not needed
            setOpenEndedAnswers((prevAnswers) => {
              const newAnswers = { ...prevAnswers };
              delete newAnswers[prevIndex]; // Remove answer for the previous question
              return newAnswers;
            });
            break;
          case "checkbox":
            setSelectedOptions([]); // Reset selected options for checkbox questions
            break;
          default:
            break;
        }
        return newIndex;
      }
      return prevIndex; // Prevent index from going out of bounds
    });
  };

  const currentQuestion = data[index];

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selected={selected}
            handleAnswerClick={handleAnswerClick}
          />
        );
      case "open":
        return (
          <OpenEndedQuestion
            question={currentQuestion}
            value={openEndedAnswers[index] || ""}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "checkbox":
        return (
          <CheckboxQuestion
            question={currentQuestion}
            selectedOptions={selectedOptions}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="title-container">
        <h1 className="title-container">Not-Too-Dumb Phone Survey</h1>
      </div>
      <div className="container">
        <h2>
          {index + 1}. {currentQuestion.question}
        </h2>
        {currentQuestion.subquestion && <p>{currentQuestion.subquestion}</p>}
        {renderQuestion()}
        <button
          onClick={next}
          className={`next-button ${
            isButtonDisabled() ? "disabled" : "active"
          }`}
          disabled={isButtonDisabled()}
        >
          Next
        </button>
        <div className="index">
          {index + 1} of {data.length} questions
        </div>
      </div>
    </div>
  );
};

export default Survey;
