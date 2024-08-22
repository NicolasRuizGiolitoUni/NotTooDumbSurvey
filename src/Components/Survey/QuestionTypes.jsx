import React from "react";
import "./QuestionTypes.css";

// Multiple Choice Component
const MultipleChoiceQuestion = ({ question, selected, handleAnswerClick }) => {
  return (
    <ul>
      {question.answers.map((answer, i) => (
        <li
          key={i}
          className={selected === i ? "selected" : ""}
          onClick={() => handleAnswerClick(i)}
        >
          {answer.text}
        </li>
      ))}
    </ul>
  );
};

// Open-Ended Component
const OpenEndedQuestion = ({ question, value, handleAnswerChange }) => {
  return (
    <div>
      <textarea
        className="open-ended-textarea"
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => handleAnswerChange(e.target.value)}
      />
    </div>
  );
};

// Checkbox Question Component
const CheckboxQuestion = ({
  question,
  selectedOptions,
  handleCheckboxChange,
}) => {
  return (
    <ul>
      {question.answers.map((answer, i) => (
        <li key={i}>
          <input
            type="checkbox"
            checked={selectedOptions.includes(i)}
            onChange={() => handleCheckboxChange(i)}
          />
          {answer.text}
        </li>
      ))}
    </ul>
  );
};

export { MultipleChoiceQuestion, OpenEndedQuestion, CheckboxQuestion };
