
import React, { useState, useEffect } from 'react';
import FormComponent from './FormComponent.jsx';
import axios from 'axios';
import './AddReviewForm.css'
import Modal from '../../sharedComponents/Modal.jsx'
const AddAReviewForm = ({ productId }) => {

  const [characteristicsID, setcharacteristicsID] = useState({});
  const [formData, setFormData] = useState({});
  const [productName, setProductName] = useState("Name Has not loaded Yes");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    const saved = {
      "review_id": localStorage.getItem(`Ratings_and_reviews_form_review_id`),
      "rating": localStorage.getItem(`Ratings_and_reviews_form_rating`),
      "summary": localStorage.getItem(`Ratings_and_reviews_form_summary`),
      "recommend": localStorage.getItem(`Ratings_and_reviews_form_recommend`),
      "response": localStorage.getItem(`Ratings_and_reviews_form_response`),
      "body": localStorage.getItem(`Ratings_and_reviews_form_body`),
      "date": localStorage.getItem(`Ratings_and_reviews_form_date`),
      "reviewer_name": localStorage.getItem(`Ratings_and_reviews_form_reviewer_name`),
      "helpfulness": localStorage.getItem(`Ratings_and_reviews_form_helpfulness`),
      "name": localStorage.getItem(`Ratings_and_reviews_form_name`),
      "size": localStorage.getItem(`Ratings_and_reviews_form_size`),
      "fit": localStorage.getItem(`Ratings_and_reviews_form_fit`),
      "length": localStorage.getItem(`Ratings_and_reviews_form_length`),
      "quality": localStorage.getItem(`Ratings_and_reviews_form_quality`),
      "width": localStorage.getItem(`Ratings_and_reviews_form_width`),
      "comfort": localStorage.getItem(`Ratings_and_reviews_form_comfort`),
      "email": localStorage.getItem(`Ratings_and_reviews_form_email`),
      "photos": JSON.parse(localStorage.getItem('Ratings_and_reviews_form_photos')) || []
    }

    setFormData(saved);
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
          //handleModalClose();
          setShowForm(false);
          localStorage.clear();
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

  return (
    <span id="add-review-form-container" >
      <Modal showModal={showForm} onClose={() => setShowForm(false)} className="add-review" className="add-review-modal">
        <div id="add-review-form-modal" ><div><p>Write Your Review</p>

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


      </Modal>
      <span>
        <button onClick={() => setShowForm(true)}>ADD A REVIEW  +</button>
      </span>
    </span>
  )
}
export default AddAReviewForm;