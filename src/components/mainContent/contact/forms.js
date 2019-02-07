import React from "react";

const FormFields = props => {
  const renderFields = () => {
    const formArray = [];
    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName]
      });
    }
    return formArray.map((item, i) => {
      return (
        <div key={i} className="form_element">
          {renderTemplate(item)}
        </div>
      );
    });
  };
  const showLabel = (show, label) => {
    return show ? <label>{label}</label> : null;
  };
  const changeHandler = (event, id, blur) => {
    const newState = props.formData;

    newState[id].value = event.target.value;

    if (blur) {
      let validData = validate(newState[id]);
      newState[id].valid = validData[0];
      newState[id].validationMessage = validData[1];
    }

    newState[id].touched = blur;

    props.change(newState);
  };

  const validate = element => {
    console.log(element);
    let error = [true, ""];

    if (element.validation.minLen) {
      const valid = element.value.length >= element.validation.minLen;
      const message = `${
        !valid ? "must be greater then " + element.validation.minLen : ""
      }`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, message] : error / e;
    }

    return error;
  };
  const showValidation = data => {
    let errorMessage = null;

    if (data.validation && !data.valid) {
      errorMessage = (
        <div className="label_error">{data.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplate = data => {
    let formTemplate = null;
    let values = data.settings;
    console.log(values);

    switch (values.element) {
      case "input":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <input
              {...values.config}
              value={values.value}
              onChange={event => changeHandler(event, data.id)}
            />
            {showValidation(values)}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <textarea
              {...values.config}
              value={values.value}
              onChange={event => changeHandler(event, data.id)}
            />
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <select
              value={values.value}
              name={values.config.name}
              onChange={event => changeHandler(event, data.id)}
            >
              {values.config.options.map((item, i) => (
                <option key={i} value={item.val}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      case "checkbox":
        formTemplate = (
          <div>
            <input {...values.config} />
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>
      < form className = {
          props.class
      }>
  {renderFields()}
  </form>
  </div>;
};
export default FormFields;