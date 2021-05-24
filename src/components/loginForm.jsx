import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    // call the server, save the changes, redirect the user to a different page
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
