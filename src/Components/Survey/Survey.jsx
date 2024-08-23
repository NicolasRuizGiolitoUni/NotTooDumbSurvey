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
  const [followUpIndices, setFollowUpIndices] = useState(new Set()); // Track follow-ups

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
      // Deselect the option
      setSelectedOptions(selectedOptions.filter((option) => option !== i));
    } else {
      // Select the option
      setSelectedOptions([...selectedOptions, i]);
    }
  };

  const isButtonDisabled = () => {
    const currentQuestion = data[index];
    switch (currentQuestion.type) {
      case "multiple":
        return selected === null;
      case "open":
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
      const nextIndex = prevIndex + 1;
      if (nextIndex < data.length) {
        resetQuestionState(data[nextIndex]);
        return nextIndex;
      }
      return prevIndex;
    });
  };

  const prev = () => {
    setIndex((prevIndex) => {
      const prevIndexAdjusted = Math.max(prevIndex - 1, 0);
      resetQuestionState(data[prevIndexAdjusted]);
      return prevIndexAdjusted;
    });
  };

  // Helper function to reset state based on question type
  const resetQuestionState = (question) => {
    switch (question.type) {
      case "multiple":
        setSelected(null);
        break;
      case "checkbox":
        setSelectedOptions([]);
        break;
      default:
        break;
    }
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
      <button
        className="back-button"
        onClick={prev}
        disabled={index === 0} // Disable on the first question
      >
        {/* Inline SVG for Back Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

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
