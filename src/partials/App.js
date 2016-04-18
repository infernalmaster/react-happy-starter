/*@flow- */

import React, {Component} from 'react';
import hello from './x';

export default class App extends Component {

  constructor() {
    super();
    this.state = {number: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    hello()
    this.setState({
      number: this.state.number + 1
    });
  }

  render() {
    return (
      <div>
        <h1>edit me</h1>
        <button onClick={this.handleClick}>{`click me ${this.state.number}`}</button>
        <div className='xxx'></div>
        <img src={require("./c.png")} />
      </div>
    );
  }
}
