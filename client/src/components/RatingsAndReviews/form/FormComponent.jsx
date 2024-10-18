
import React from 'react';
import StarSelection from './StarSelection.jsx';
const FormComponent = ({ formItem, formData, setFormData }) => {
  if (formItem === undefined) { return <div>Error loading component</div> }
  if (formData === undefined) { return <div>Error loading formData</div> }

  const full = "../../icons/star-full.svg";
  const empty = "../../icons/star-empty.svg";

  let { title } = formItem;
  let required = formItem.required || false;
  let placeholder = formItem.placeholder || '';
  let maxLength = formItem.maxLength || Number.MAX_SAFE_INTEGER;
  let minLength = formItem.minLength || 0;

  let value = formItem['value'] || title.toLowerCase();
  formData[value] = formData[value] || "";

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[value] = e.target.value;
    //console.log(e.target.value);
    setFormData(newFormData);
    //console.log(newFormData);
  }
  if (formItem.type === 'star-selection') {
    const starStyle = {'opacity':'0'}//{ 'display': 'none' };
    const ratingText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    return (
      <div className="form-group" >
        <label htmlFor={title}>{title}</label>
        <div className="radio-group">
          {
            [0, 1, 2, 3, 4].map((label, i) => {
              return (<span key={title + i}><input style={starStyle} name={title} id={title + i} onChange={() => ({})} onClick={handleChange} required={required} value={i + 1} type="radio"
                checked={formData[value] >= i + 1 ? true : false} />
                <label htmlFor={title + i}>{formData[value] >= i + 1 ? <img src={full} /> : <img src={empty} />}</label></span>)
            })
          }
          <span>
            {
              ratingText[(formData[value] - 1)]
          }
          </span>
        </div>
      </div>
    )
  } else if (formItem.type === 'radio-group') {
    let { groups } = formItem;
    return (
      <div className="form-group" >
        <label htmlFor={title}>{title}</label>
        <div className="radio-group">
          {
            groups.map((label, i) => {
              return (<span key={title + i}><input name={title} id={title + i} onChange={handleChange} required={required} value={i + 1} type="radio"
                checked={formData[value] == i + 1 ? true : false} />
                <label htmlFor={title + i}>{label}</label></span>)
            })
          }
        </div>
      </div>
    )
  } else if (formItem.type === 'text-input' || formItem.type === 'email') {
    return (
      <div className="form-text-input">
        <label htmlFor={title}>{title}</label>
        <div>
          <input type="text" placeholder={placeholder} type={formItem.type} name={title} maxLength={maxLength} id={title} required={required} value={formData[value]} onChange={handleChange} />
        </div>
      </div>)
  } else if (formItem.type === 'text-area') {
    return (
      <div className="form-text-area" >
        <label htmlFor={title}>{title}</label>
        <div>
          <textarea type="textarea" placeholder={placeholder} name={title} minLength={minLength} maxLength={maxLength} id={title} required={required} value={formData[value]} onChange={handleChange} ></textarea>
        </div>
        <div>{
          formData[value].length >= minLength ?
            "Minimum Reached" :
            'Minimum required characters left: ' + (minLength - formData[value].length)
        }
        </div>
      </div>)
  }
}
export default FormComponent;