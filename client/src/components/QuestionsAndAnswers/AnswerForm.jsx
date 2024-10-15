import React from "react";

const AddQuestionForm = ({
  productId,
  currentQuestionId,
  handleAddAnswer,
  handleAnswerChange,
  setCurrentQuestionId,
  ansData
}) => {

  return (
    <div className="add-answer-form">
      <h3>Submit Your Answer</h3>
      <form onSubmit={handleAddAnswer}>
        <textarea
          name="body"
          value={ansData.body}
          onChange={handleAnswerChange}
          placeholder="Type your answer here..."
          required
        />
        <input
          name="name"
          value={ansData.name}
          onChange={handleAnswerChange}
          placeholder="Your nickname"
          required
        />
        <input
          type="email"
          name="email"
          value={ansData.email}
          onChange={handleAnswerChange}
          placeholder="Your email"
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setCurrentQuestionId(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
