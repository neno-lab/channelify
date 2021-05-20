import React from 'react';
import './style.scss';

const InputField = (props) => {
  const [isActive, setActive] = React.useState(false);
  const [hasErrors, setErrors] = React.useState(false);

  React.useEffect(() => {
    if (props.errors?.type === 'required') {
      setErrors(true);
      setActive(false);
    } else {
      setErrors(false);
    }
  }, [props.errors]);

  return (
    <div
      className={`input-field-holder ${
        isActive || props.watch ? 'active' : ''
      } ${hasErrors ? 'error' : ''}`}
      onClick={() => setActive(true)}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        {...props.register}
        type={props.type}
      />
    </div>
  );
};

export default InputField;
