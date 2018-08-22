import React, { Component } from 'react';
import * as io              from 'socket.io-client'
import $ from 'jquery'

import logo from './logo.svg';
import logoSocket from './socket.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    (() => {
      var socket = io('http://localhost:3000');
      $('form').submit(() => {
        socket.emit('chat message', $('#m').val());
        $('#messages').append($('<li class=\'me\'>').text($('#m').val()))
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#messages').append($('<li class=\'you\'>').text(msg));
      });
    })()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logoSocket} className="App-logo" alt="logoSocket" />
          <h1 className="App-title">Welcome to React + Socket.io</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>
        <ul id="messages"></ul>
      </div>
    );
  }
}

export default App;
