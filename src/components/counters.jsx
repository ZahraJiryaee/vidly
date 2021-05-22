import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 3 },
      { id: 3, value: 1 },
      { id: 4, value: 9 },
    ],
  };
  render() {
    return (
      <React.Fragment>
        {this.state.counters.map((counter) => (
          <Counter key={counter.id} value={counter.value} selected />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
