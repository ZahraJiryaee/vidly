import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        count: 0,
        tags: ['tag1', 'tag2', 'tag3']
    }

    /*
    constructor(){
        super();
        this.handleIncrement = this.handleIncrement.bind(this); // bc constructor has access to this
    }
    */

    render() {         
        
        return ( 
            <React.Fragment>                
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={this.handleIncrement} style={this.style} className="btn btn-secondary btn-sm">Increment</button>                
                {this.state.tags.length === 0 && 'please create a new tag!'}
                {this.renderTags()}
            </React.Fragment>
         );
    }

    handleIncrement = () => {
    //  this.state.count ++   //this isn't gonna work
     this.setState({count: this.state.count + 1})   
    }

    renderTags(){
        if(this.state.tags.length === 0) return <p>Ther are no tags!</p>;
        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    }

    getBadgeClasses() {
        let classes = 'badge m-2 badge-';
        classes += this.state.count === 0 ? "warning" : "primary"
        return classes
    }

    formatCount(){
        const {count} = this.state;
        return count === 0 ? "Zero" : count;
    }
}
 
export default Counter;