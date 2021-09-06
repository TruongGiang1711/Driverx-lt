import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* <FontAwesomeIcon icon="coffee" /> */}
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
