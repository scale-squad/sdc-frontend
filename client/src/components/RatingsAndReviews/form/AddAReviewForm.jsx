
import React, { useState, useEffect } from 'react';
import FormComponent from './FormComponent.jsx';
import axios from 'axios';
const AddAReviewForm = ({ productId }) => {

  const [characteristicsID, setcharacteristicsID] = useState({});
  const [formData, setFormData] = useState({});
  const [productName, setProductName] = useState("Name Has not loaded Yes");

  const handleModalClose = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalForm = document.getElementById('add-review-form-modal');
    const modalCloseButton = document.getElementById('add-review-form-modal-close-button');
    modalBackground.style.display = "";
    modalForm.style.display = "";
    modalCloseButton.style.display = "";
  };

  const handleModalButtonClick = (img) => {
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalForm = document.getElementById('add-review-form-modal');
    const modalCloseButton = document.getElementById('add-review-form-modal-close-button');
    modalBackground.innerHTML = ``;
    modalBackground.prepend(modalForm);
    modalForm.style.display = 'flex';
    modalBackground.style.display = "flex";
    modalCloseButton.style.display = "flex";
  }

  const createModalBackgroundIfNone = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    if (!modalBackground) {
      const body = document.body;
      let modalDiv = document.createElement('div');
      let modalCloseButton = document.createElement('div');
      let modalContents = document.createElement('div');
      modalCloseButton.setAttribute('id', 'add-review-form-modal-close-button');
      modalCloseButton.append('𝕩');
      modalDiv.setAttribute('id', 'modal-fullscreen');
      modalContents.setAttribute('id', 'modal-contents');
      modalCloseButton.addEventListener('click', handleModalClose);
      modalDiv.append(modalCloseButton);
      modalDiv.append(modalContents);
      body.prepend(modalDiv);
    }
  }
  createModalBackgroundIfNone();


  useEffect(() => {
    axios
      .get(`/products/${productId}`)
      .then(res => setProductName(res.data.name))
      .then(res => getCharacteristics())
      .then(res => setcharacteristicsID(res))
      .catch(err => console.log(err));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('add-review-form');
    if (form.checkValidity()) {
      const queryData = exportBody();
      axios.post('/reviews', queryData)
        .then(res => {
          alert("thanks for your submission");
          handleModalClose();
          setFormData({});
        })
        .catch(err => {
          alert("error submitting data");
          console.log(err)
        });
    } else {
      form.reportValidity();
    }
  };

  const getCharacteristics = () => {
    let queryParams = { params: { product_id: productId } };
    return axios
      .get('/reviews/meta', queryParams).
      then(res => res.data.characteristics)
      .catch(err => console.log(err));
  };

  const exportBody = () => {
    const charObjects = {};
    if (characteristicsID.Size)
      charObjects[characteristicsID.Size.id] = +formData.size;
    if (characteristicsID.Length)
      charObjects[characteristicsID.Length.id] = +formData.length;
    if (characteristicsID.Fit)
      charObjects[characteristicsID.Fit.id] = +formData.fit;
    if (characteristicsID.Quality)
      charObjects[characteristicsID.Quality.id] = +formData.quality;
    if (characteristicsID.Width)
      charObjects[characteristicsID.Width.id] = +formData.width;
    if (characteristicsID.Comfort)
      charObjects[characteristicsID.Comfort.id] = +formData.comfort;

    const { rating, summary, body, recommend, name, email } = formData;
    const photos = formData.photos || [];
    const exportedBody = {
      product_id: Number(productId),
      rating: Number(rating), summary, body, recommend: recommend === '1', name, email,
      photos, characteristics: charObjects
    }
    return exportedBody;
  };

  //FORM FIELDS/////////////////////////////////////////////////////////////////////////////////////
  const rating = {
    'type': 'star-selection', required: true, title: 'Rating', value: 'rating'
  };
  const recommend = {
    'type': 'radio-group', required: true, title: 'Do you Recommend this item', value: 'recommend',
    groups: ['Yes', 'No']
  };
  const size = {
    'type': 'radio-group', required: true, title: 'Size', value: 'size',
    groups: ['A size too small', '½ a size too small', 'Perfect',
      '½ a size too big', 'A size too wide']
  };
  const width = {
    'type': 'radio-group', required: true, title: 'Width', value: 'width',
    groups: ['Too Narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide']
  };
  const comfort = {
    'type': 'radio-group', required: true, title: 'Comfort', value: 'comfort',
    groups: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']
  };
  const quality = {
    'type': 'radio-group', required: true, title: 'Quality', value: 'quality',
    groups: ['Poor', 'Below average', 'What I expected', 'Pretty great', "Perfect",]
  };
  const length = {
    'type': 'radio-group', required: true, title: 'Length', value: 'length',
    groups: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']
  };
  const fit = {
    'type': 'radio-group', required: true, title: 'Fit', value: 'fit',
    groups: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  };
  const summary = {
    type: 'text-input', required: true, title: 'Review-Summary', value: 'summary', placeholder: 'Example: Best purchase ever!', maxLength: 60
  };
  const body = {
    type: 'text-area', required: true, title: 'Review-Body', value: 'body', maxLength: 1000, minLength: 50
  };
  const photos = {
    type: 'imageUpload', title: 'Photos to include', value: 'photos'
  };
  const name = {
    type: 'text-input', required: true, title: 'Display Name', value: 'name', placeholder: 'Example: jackson11!', maxLength: 60
  };
  const email = {
    type: 'email', required: true, title: 'Email', value: 'email', placeholder: 'Example: jackson11@email.com', maxLength: 60
  };

  const noDisplayStyle = { 'display': 'none', 'backgroundColor': 'white', 'overflow': 'auto' };

  return (
    <span id="add-review-form-container" >
      <div id="add-review-form-modal" style={noDisplayStyle}><div><p>Write Your Review</p>
        <div id='add-review-form-modal-close-button' onClick={handleModalClose}>X</div>
        <div className="form-group">
          <p>
            <span>About the {productName}</span>
          </p>
        </div>
        <form id="add-review-form">
          <FormComponent formItem={rating} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={recommend} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={size} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={width} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={comfort} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={quality} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={length} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={fit} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={summary} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={body} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={photos} formData={formData} setFormData={setFormData} />
          <FormComponent formItem={name} formData={formData} setFormData={setFormData} />
          <div >For privacy reasons, do not use your full name or email address</div>
          <FormComponent formItem={email} formData={formData} setFormData={setFormData} />
          <div>For authentication reasons, you will not be emailed</div>
          <button type='submit' onClick={handleSubmit}>Submit review</button>
        </form >
      </div >
      </div>
      <span>
        <button onClick={handleModalButtonClick}>ADD A REVIEW  +</button>
      </span>
    </span>
  )
}
export default AddAReviewForm;