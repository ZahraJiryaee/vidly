import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  //   username = React.createRef();

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(3).label("Password"),
  };

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
    /*
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
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

  handleSubmit = (e) => {
    e.preventDefault(); // full page reload

    // const username = this.username.current.value;

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} }); // error property shiould always be set to an obj
    if (errors) return;
    // call the server, save the changes, redirect the user to a different page
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            error={errors.password}
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
