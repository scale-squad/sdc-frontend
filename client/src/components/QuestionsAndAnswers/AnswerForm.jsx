import React, { useState } from "react";
import Modal from "./Modal.jsx";
import ImageUpload from "../sharedComponents/ImageUpload.jsx";
import { Cloudinary } from "cloudinary-core";

const AnswerForm = ({
  productId,
  currentQuestionId,
  handleAddAnswer,
  handleAnswerChange,
  setCurrentQuestionId,
  ansData,
  handleImageUpload,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((img, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="qa_form">
      <h3>Submit Your Answer</h3>
      <form onSubmit={handleAddAnswer}>
        <label>
          Your Answer:
          <textarea
            name="body"
            value={ansData.body}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            maxLength="1000"
            required
          />
        </label>
        <label>
          Nickname:
          <input
            name="name"
            value={ansData.name}
            onChange={handleAnswerChange}
            placeholder="Example: jack543!"
            maxLength="60"
            required
          />
        </label>
        <span className="note">
          **For privacy reasons, do not use your full name or email address
        </span>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={ansData.email}
            onChange={handleAnswerChange}
            placeholder="Example: jack@email.com"
            maxLength="60"
            required
          />
        </label>
        <span className="note">
          **For authentication reasons, you will not be emailed</span>
        <ImageUpload handleImageUpload={handleImageUpload} handleImageRemove={handleRemoveImage} />

        <div className="thumbnail-container">
          {selectedImages.map((image, index) => (
            <div key={index} className="thumbnail-wrapper">
              <img
                src={image}
                alt="Thumbnail"
                className="thumbnail"
              />
              <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>
                x
              </button>
            </div>
          ))}
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <button
          className="cancel-btn"
          type="button"
          onClick={() => setCurrentQuestionId(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AnswerForm;