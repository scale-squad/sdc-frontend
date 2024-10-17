
import React, { useState, useEffect } from 'react';
import FormComponent from './FormComponent.jsx';
const AddReviewForm = ({ productId }) => {
  //const testData = { Size: 3, Comfort: 3 }
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = document.getElementById('add-review-form');
    if (form.checkValidity()) {
      console.log("submit here");
    } else {
      form.reportValidity();
    }
  }
  //FORM FIELDS/////////////////////////////////////////////////////////////////////////////////////
  const recommend = {
    'type': 'radio-group', required: true, title: 'Do you Recommend this item', value:'recommend',
    groups: ['Yes', 'No']
  };
  const size = {
    'type': 'radio-group', required: true, title: 'Size', value:'size',
    groups: ['A size too small', '½ a size too small', 'Perfect',
      '½ a size too big', 'A size too wide']
  };
  const width = {
    'type': 'radio-group', required: true, title: 'Width', value:'width',
    groups: ['Too Narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide']
  };
  const comfort = {
    'type': 'radio-group', required: true, title: 'Comfort', value:'comfort',
    groups: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']
  };
  const quality = {
    'type': 'radio-group', required: true, title: 'Quality', value:'quality',
    groups: ['Poor', 'Below average', 'What I expected', 'Pretty great', "Perfect",]
  };
  const length = {
    'type': 'radio-group', required: true, title: 'Length', value:'length',
    groups: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']
  };
  const fit = {
    'type': 'radio-group', required: true, title: 'Fit', value: 'fit',
    groups: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  };
  const summary = {
    type: 'text-input', required: true, title: 'Review-Summary', value:'summary', placeholder: 'Example: Best purchase ever!', maxLength: 60
  };
  const body = {
    type: 'text-area', required: true, title: 'Review-Body', value:'body', maxLength: 1000, minLength: 50
  };
  const email = {
    type: 'email', required: true, title: 'Email', value:'email', placeholder: 'Example: jackson11@email.com', maxLength: 60
  };
  return (<div><p>Write Your Review</p>
    <div className="form-group">
      <p>
        <span>About the {productId}</span>
      </p>
    </div>
    <form id="add-review-form">
      <FormComponent formItem={recommend} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={size} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={width} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={comfort} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={quality} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={length} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={fit} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={summary} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={body} formData={formData} setFormData={setFormData} />
      <FormComponent formItem={email} formData={formData} setFormData={setFormData} />
      <div >
        <p>For authentication reasons, you will not be emailed”
        </p>
      </div>
      <button type='submit' onClick={handleSubmit}>Submit review</button>
    </form>
  </div>)
}
export default AddReviewForm;