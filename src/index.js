/* @flow */

import React from 'react';
import {render} from 'react-dom';
import App from './App';

render(
  <App />,
  document.getElementById('root')
);


function log(msg: string): boolean {
  console.log(msg);
  return false;
}

log('test');

class Xxx {
  constructor() {
    this.y = this.y.bind(this);
  }

  y() {
    console.log('hello from y')
  }
}

var a = new Xxx();
a.y();

var css = require('./index.css');
