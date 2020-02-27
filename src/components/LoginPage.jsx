import React, { Component } from 'react';
import Mensaje from "./listComponents/Mensaje";
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
      messageOpen: false,
      reason: "",
      message: ""
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
    if (this.state.user == "" || this.state.password == "") {
      this.setState({
        reason: "Campos Vacíos",
        message: "Complete todos los campos para iniciar sesión",
        messageOpen: true
      })
      return
    }
    let data = {
      email: this.state.user,
      password: this.state.password,
      remember_me: true
    }
    axios.post(host.host + '/api/auth/login', data).then(res => {
      localStorage.setItem("token", res.data.token);
      this.setState({
        isLoggedIn: true,
      })
    }).catch(error => {
      this.setState({
        reason: "Datos Inválidos",
        message: "Verifique que su usuario o contraseña sean los correctos",
        messageOpen: true
      })
    });
  }

  closeMessage() {
    this.setState({
      messageOpen: false
    })
  }

  render() {

    let content;

    if (this.state.isLoggedIn === true) {
      return <Redirect to={{pathname: '/main'}} />
    } else {
      content = (
        <div className="loginBox">
          {this.state.messageOpen ?
            <Mensaje
              reason = {this.state.reason}
              message = {this.state.message}
              closeMessage = {this.closeMessage.bind(this)}
            />
            : null
          }
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
