export const data = [
  {
    question: "What is your age group?",
    type: "multiple",
    answers: [
      { text: "18-24" },
      { text: "25-34" },
      { text: "35-44" },
      { text: "45-54" },
      { text: "55+" },
    ],
  },
  {
    question: "What is your gender?",
    type: "multiple",
    answers: [
      { text: "Female" },
      { text: "Male" },
      { text: "Non-binary" },
      { text: "Prefer not to say" },
    ],
  },
  {
    question: "What is your country of origin?",
    type: "open",
    placeholder: "Type here",
  },
  {
    question: "What is language(s) do you speak?",
    type: "open",
    placeholder: "Separate with commas",
  },
  {
    question: "What is your highest level of education? ",
    type: "multiple",
    subquestion:
      "If you are currently in full-time education please put the highest qualification you have already completed (e.g., you are doing your master’s degree, therefore your highest qualification is bacherlors or equivalent level degree)",
    answers: [
      { text: "I did not complete any formal education" },
      { text: "Early childhood education" },
      { text: "Primary education" },
      { text: "Lower secondary education (GCSEs or equivalent level)" },
      { text: "Upper secondary education (A-Levels or baccalaureate)" },
      {
        text: "Post-secondary, non-tertiary education (generally vocational/ professional qualification of 1-2 years, e.g. college, trade school)",
      },
      { text: "Bachelors or equivalent level degree" },
      { text: "Masters or equivalent level degree" },
      { text: "Doctoral or equivalent level degree" },
    ],
  },
  {
    question: "What is your current employment status? (select all that apply)",
    type: "checkbox",
    answers: [
      { text: "Student" },
      { text: "Part-time employed" },
      { text: "Full-time employed" },
      { text: "Unemployed" },
      { text: "Retired" },
    ],
  },
];
