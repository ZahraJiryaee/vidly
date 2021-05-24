import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

/*
remove all attributes in type of :  attr={attr}
bc we can automatically pass them via rest operator.
the rest parameter include any other property other than name, label, error => so we should include
name={name} in input field
*/

/*

const Input = ({ name, label, value, error, type, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}        
        type={type}
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};


*/

export default Input;
