import React, { Component } from 'react';
import * as io              from 'socket.io-client'
import $ from 'jquery'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    $(() => {
      var socket = io('http://localhost:3000');
      $('form').submit(() => {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
