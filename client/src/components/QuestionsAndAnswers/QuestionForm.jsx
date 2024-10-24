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
        <label>
          Your Question:
          <textarea
            name="body"
            value={questionData.body}
            onChange={handleInputChange}
            placeholder="Type your question here..."
            required
          />
        </label>
        <label>
          Nickname:
          <input
            name="name"
            value={questionData.name}
            onChange={handleInputChange}
            placeholder="Example: jackson11!"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={questionData.email}
            onChange={handleInputChange}
            placeholder="Example: anc@gmail.com"
            required
          />
        </label>
        <span className="note">
          **For authentication reasons, you will not be emailed
        </span>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowAddQuestionForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
