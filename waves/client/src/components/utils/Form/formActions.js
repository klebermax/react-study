export const validate = (element, formdata = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Password do not match' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };

  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    const validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (formData[key].validation.confirm) continue;

    dataToSubmit[key] = formData[key].value;
  }

  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let isValid = true;

  for (let key in formData) {
    isValid = formData[key].valid && isValid;
  }
  return isValid;
};

export const populateOptionFields = (formdata, arrayData = [], key) => {
  const newArray = [];
  //const newFormdata = { ...formdata };

  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  formdata[key].config.options = newArray;

  return formdata;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    if (Array.isArray(newFormData[key].value)) newFormData[key].value = [];
    else newFormData[key].value = '';

    newFormData[key].value = '';
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
};
