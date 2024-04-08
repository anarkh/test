import React, { Component } from "react";

export default class Router2 extends Component {
  state = {
    count: 0
  }
  
  handleClick() {
    const count = this.state.count + 1;
    this.setState({count});
  }
  render(): React.ReactNode {
      return (<div>
        <h1>{this.state.count}</h1>
        <button onClick={this.handleClick.bind(this)}>+</button>
    </div>)
  }
}