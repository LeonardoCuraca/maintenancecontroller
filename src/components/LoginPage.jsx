import React, { Component } from 'react';
import axios from 'axios';
import * as host from './host.js';

import {
  Redirect
} from 'react-router-dom';

import './style/LoginStyle.css';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      isLoggedIn: false,
    }
  }

  changeUser(e) {
    this.setState({
      user: e.target.value
    }, function() {
      console.log(this.state.user);
    });
  }

  changePassword(e) {
    this.setState({
      password: e.target.value
    }, function() {
      console.log(this.state.password);
    });
  }

  handleSubmit(e) {
    axios.get(host.host + '/api/login/?email=' + this.state.user + '&password=' + this.state.password).then(res => {
      localStorage.setItem("token", res.data.token);
      this.setState({
        isLoggedIn: true,
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render() {

    let content;

    if (this.state.isLoggedIn === true) {
      return <Redirect to={{pathname: '/main'}} />
    } else {
      content = (
        <div className="loginBox">
          <div className="loginForm">
            <h1>Bienvenido</h1>
            <input className="inputText" type="text" value={this.state.user} placeholder="Usuario" onChange={this.changeUser.bind(this)} required />
            <input className="inputText" type="password" value={this.state.password} placeholder="Contraseña" onChange={this.changePassword = this.changePassword.bind(this)} required />
            <button className="loginButton" onClick={this.handleSubmit.bind(this)}>Iniciar Sesión</button>
          </div>
        </div>
      )
    }

    return (
      <div>{content}</div>
    );
  }
};
