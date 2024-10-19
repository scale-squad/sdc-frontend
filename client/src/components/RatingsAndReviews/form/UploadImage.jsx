import React, { useState, useEffect, useRef } from 'react';


const UploadImage = ({  setImageList, imageList }) => {
  //if (formData) imageList = formData['photos'];
  const tempImageList = [...imageList];
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'daxozvday',
        uploadPreset: 'FEC_Rating_and_reviews',
        maxFiles: (5 - imageList.length)
      }, (error, result) => {
        if (result.event === 'success') {
          addImage(result.info.secure_url);
        }
        if (result.event === 'close') {
          saveImageList();
        }
        if (error) { return console.log(error) }
      });

  }, []);

  const handleRemove = (removeIndex) => {
    const newImageList = imageList.filter((x, i) => i !== removeIndex);
    setImageList(newImageList);
  };

  const addImage = (url) => {
    if (tempImageList.length < 5)
      tempImageList.push(url);
  };
  // good!
  const saveImageList = () => {
    setImageList(tempImageList.slice(0, 5));
  };

  const thumbnailStyle = { 'width': '50px', 'height': '50px' }
  return (
    <div>
      {
        imageList.map((image, i) => <span key={image + i}> <button onClick={() => handleRemove(i)}>X</button> <img src={image} style={thumbnailStyle}></img></span>)
      }{
        imageList.length < 5 ?
          <div>
            <button onClick={() => widgetRef.current.open()}>
              Upload
            </button>
          </div> : ""
      }
    </div>
  );
};

export default UploadImage;

