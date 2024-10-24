import React, { useState } from "react";

const ImageUpload = ({ handleImageUpload, handleImageRemove }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    if (selectedImages.length >= 5) return;
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setSelectedImages([...selectedImages, data.secure_url]);
          handleImageUpload(data.secure_url);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleRemoveImage = (index) => {
    const allImages = selectedImages.filter((img, i) => i !== index);
    setSelectedImages(allImages);
    handleImageRemove(index);
  };

  return (
    <div>
      <label>
        Upload photos:
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          disabled={selectedImages.length >= 5}
        />
      </label>
      <div className="thumbnail-container">
        {selectedImages.map((image, index) => (
          <div key={index} className="thumbnail-wrapper">
            <img
              src={image}
              alt="Thumbnail Img"
              className="thumbnail"
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveImage(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;