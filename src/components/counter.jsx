import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        count: 0,        
     }
    style = {
        fontSize: 10,
        fontWeight: "bold"
    }
    render() { 
        return ( 
            <React.Fragment>                
                <span style={{fontSize: 20}} className="badge badge-primary m-2">{this.formatCount()}</span>
                <button style={this.style} className="btn btn-secondary btn-sm">Increment</button>
            </React.Fragment>
         );
    }

    formatCount(){
        const {count} = this.state;
        return count === 0 ? "Zero" : count;
    }
}
 
export default Counter;