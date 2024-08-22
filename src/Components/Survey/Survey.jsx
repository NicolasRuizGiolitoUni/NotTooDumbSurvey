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
    const currentQuestion = data[index];
    let newIndex = index;

    if (currentQuestion.followUp) {
      const selectedAnswerText = currentQuestion.answers[selected]?.text || "";

      const selectedTexts = selectedOptions
        .map((i) => currentQuestion.answers[i]?.text)
        .filter(Boolean);

      // Determine if follow-up should be shown
      const shouldShowFollowUp =
        (currentQuestion.type === "multiple" &&
          selectedAnswerText === currentQuestion.followUp.condition) ||
        (currentQuestion.type === "checkbox" &&
          selectedTexts.includes(currentQuestion.followUp.condition));

      if (shouldShowFollowUp && !followUpIndices.has(newIndex)) {
        setFollowUpIndices((prev) => new Set(prev).add(newIndex + 1));
        newIndex = index + 1;
        data.splice(newIndex, 0, currentQuestion.followUp.nextQuestion); // Insert follow-up
      }
    }

    // Move to the next question
    setIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < data.length) {
        // Reset state based on the new question type
        const nextQuestion = data[nextIndex];
        resetQuestionState(nextQuestion);
        return nextIndex;
      }
      return prevIndex; // Prevent index from going out of bounds
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
      case "open":
        // No need to reset open-ended text unless you wish to clear previous answers
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
