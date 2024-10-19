import React, { useState } from "react";
import Modal from "./Modal.jsx";

const AnswerForm = ({
  productId,
  currentQuestionId,
  handleAddAnswer,
  handleAnswerChange,
  setCurrentQuestionId,
  ansData,
  handleImageUpload
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageChange = (e) => {

  };


  return (
    <div className="qa_form">
      <h3>Submit Your Answer</h3>
      <form onSubmit={handleAddAnswer}>
        <textarea
          name="body"
          value={ansData.body}
          onChange={handleAnswerChange}
          placeholder="Type your answer here..."
          maxLength="1000"
          required
        />
        <input
          name="name"
          value={ansData.name}
          onChange={handleAnswerChange}
          placeholder="Example: jack543!"
          maxLength="60"
          required
        />
        <span >
          For privacy reasons, do not use your full name or email address
        </span>
        <input
          type="email"
          name="email"
          value={ansData.email}
          onChange={handleAnswerChange}
          placeholder="Example: jack@email.com"
          maxLength="60"
          required
        />
        <span >
          For authentication reasons, you will not be emailed
        </span>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />
        {selectedImage && (
          <div className="thumbnail-container">
            <img
              src={selectedImage}
              alt="Thumbnail"
              className="thumbnail"
              onClick={handleThumbnailClick}
            />
          </div>
        )}
        <button className="submit-btn" type="submit">Submit</button>
        <button className="cancel-btn" type="button" onClick={() => setCurrentQuestionId(null)}>
          Cancel
        </button>
      </form>

    </div>
  );
};

export default AnswerForm;