
import React from 'react';
const FormComponent = ({ formItem, formData, setFormData }) => {
  if (formItem === undefined) { return <div>Error loading component</div> }
  if (formData === undefined) { return <div>Error loading formData</div> }

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
    setFormData(newFormData);
  }

  if (formItem.type === 'radio-group') {
    let { groups } = formItem;
    return (
      <div class="form-group" >
        <label for={title}>{title}</label>
        <div class="radio-group">
          {
            groups.map((label, i) => {
              return (<span><input name={title} id={title + i} onChange={handleChange} required={required} value={i + 1} type="radio"
                checked={formData[value] == i + 1 ? true : false} />
                <label for={title + i}>{label}</label></span>)
            })
          }
        </div>
      </div>
    )
  } else if (formItem.type === 'text-input' || formItem.type === 'email') {
    return (
      <div class="form-text-input">
        <label for={title}>{title}</label>
        <div>
          <input type="text" placeholder={placeholder} type={formItem.type} name={title} maxlength={maxLength} id={title} required={required} value={formData[value]} onChange={handleChange} />
        </div>
      </div>)
  } else if (formItem.type === 'text-area') {
    return (
      <div class="form-text-area" >
        <label for={title}>{title}</label>
        <div>
          <textarea type="textarea" placeholder={placeholder} name={title} minlength={minLength} maxlength={maxLength} id={title} required={required} value={formData[value]} onChange={handleChange} ></textarea>
        </div>
        <div>{
          formData[value].length >= minLength ?
            "Minimum Reached" :
            'Minimum required characters left: ' +  (minLength - formData[value].length)
        }
        </div>
      </div>)
  }
}
export default FormComponent;