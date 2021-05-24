import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
    /*
        const errors = {};
        const { data } = this.state;
        if (data.username.trim() === "")
          errors.username = "Username is required.";
        if (data.password.trim() === "")
          errors.password = "Password is required.";
        return Object.keys(errors).length === 0 ? null : errors;
    
         */
  };

  validateProperty = ({ name, value }) => {
    // const obj = { username: value};
    const obj = { [name]: value };
    console.log("obj", obj);
    const schema = { [name]: this.schema[name] };
    console.log("schema", schema);
    const { error } = Joi.validate(obj, schema);
    console.log("val-prop", { error });
    return error ? error.details[0].message : null;
    /*
        if (name === "username") {
          if (value.trim() === "") return "Required";
        }
        if (name === "password") {
          if (value.trim() === "") return "Required";
        }
         */
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  handleSubmit = (e) => {
    e.preventDefault(); // full page reload

    // const username = this.username.current.value;

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} }); // error property shiould always be set to an obj
    if (errors) return;
    this.doSubmit();
  };
}

export default Form;
