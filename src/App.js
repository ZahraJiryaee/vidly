import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";

class App extends Component {
  // vidly app

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Movies />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
