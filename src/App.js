import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rental from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  // vidly app

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          {/* Route[path][component]*4 => zen coding - in order to work: change the file extension to .jsx or change the language of the page from js to js react */}
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rental}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" to="/movies" exact />
            {/* this path matches any url that start with / => so we should use Switch  */}
            <Redirect to="/not-found" />
            {/* it doesn't have "from" so it can be applied to any other urls */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
