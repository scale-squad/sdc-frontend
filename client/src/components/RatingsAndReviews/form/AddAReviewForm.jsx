
import React, { useState, useEffect } from 'react';
import FormComponent from './FormComponent.jsx';
import axios from 'axios';
const AddAReviewForm = ({ productId }) => {
  let test = {
    "product_id": 65631,
    "summary": "recommendrecommendrecommend",
    "body": "recommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommendrecommend",
    //"rating": 4,
    "recommend": "1",
    "name": "recommend",
    "email": "dagdgfsdgdsgdsfgsdgdg@aasdfsdaf.com",
    "characteristics": {
      "14": "1",
      "15": "1",
      "16": "1",
      "17": "1",
      "18": "1",
      "19": "1"
    },
    "size": "1",
    "width": "1",
    "comfort": "1",
    "quality": "1",
    "length": "1",
    "fit": "1"
  };

  //const [formData, setFormData] = useState({ ...test });
  const [formData, setFormData] = useState({});
  const [productName,setProductName] =useState("Name Has not loaded Yes");
  useEffect(()=>{
    //const query = {params:{product_id:productId}};
    axios
    .get(`/products/${productId}`)
    .then(res=>setProductName(res.data.name))
    .catch(err=>console.log(err));
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('add-review-form');
    if (form.checkValidity()) {
      const queryData = exportBody();
      //console.log(queryData);
      const queryParams = {params:{product_id:productId}}
      axios.post('/reviews',exportBody,queryParams)
      .then(res=>{
        alert("thanks for your submission");
        handleModalButtonClick();
      })
      .catch(err=>{
        alert("error submitting data");
        console.log(err)
      });
    } else {
      form.reportValidity();
    }
  };

  const handleModalButtonClick = () => {
    const form = document.getElementById('add-review-form-modal');
    form.showModal();
  };

  const exportBody = () => {
    const characteristics = {
      14: formData.size, 15: formData.width,
      16: formData.comfort, 17: formData.quality,
      18: formData.length, 19: formData.fit
    }
    const { rating, summary, body, recommend, name, email } = formData;
    const exportedBody = {
      product_id: productId,
      rating, summary, body, recommend: recommend === '1', name, email, characteristics
    }
    return exportedBody;
  };
  const handleModalClose = ()=>{
    let form = document.getElementById('add-review-form-modal');
    form.close();
  }
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
  const name = {
    type: 'text-input', required: true, title: 'Display Name', value: 'name', placeholder: 'Example: jackson11!', maxLength: 60
  };
  const email = {
    type: 'email', required: true, title: 'Email', value: 'email', placeholder: 'Example: jackson11@email.com', maxLength: 60
  };

  return (
    <span id="add-review-form-container">
      <dialog id="add-review-form-modal"><div><p>Write Your Review</p>
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
          <FormComponent formItem={name} formData={formData} setFormData={setFormData} />
          <div >For privacy reasons, do not use your full name or email address</div>
          <FormComponent formItem={email} formData={formData} setFormData={setFormData} />
          <div>For authentication reasons, you will not be emailed</div>
          <button type='submit' onClick={handleSubmit}>Submit review</button>
        </form >
      </div >
      </dialog>
      <span>
        <button onClick={handleModalButtonClick}>ADD A REVIEW  +</button>
      </span>
    </span>
  )
}
export default AddAReviewForm;