import React from "react";

const QuestionForm = ({
  productId,
  setNewQuestionData,
  handleInputChange,
  handleAddQuestion,
  questionData,
  setShowAddQuestionForm
}) => {

  return (
    <div className="qa_form">
      <h2>Ask Your Question</h2>
      <form onSubmit={handleAddQuestion}>
        <textarea
          name="body"
          value={questionData.body}
          onChange={handleInputChange}
          placeholder="Type your question here..."
          required
        />
        <input
          name="name"
          value={questionData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          required
        />
        <input
          type="email"
          name="email"
          value={questionData.email}
          onChange={handleInputChange}
          placeholder="Your email"
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowAddQuestionForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
