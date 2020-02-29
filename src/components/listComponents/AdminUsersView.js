import React, { Component } from 'react';
import axios from 'axios';

import AdminUsersNewRow from "./AdminUsersNewRow";
import AdminUsersRow from "./AdminUsersRow";
import Mensaje from "./Mensaje";

import * as host from '../host';

export default class AdminUsersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserRow: false,
      newUserRowData: [],
      buttons: true,
      reason: "",
      message: "",
      mensaje: false
    }
  }

  componentWillMount() {
    console.log("hi");
    this.setState({
      users: []
    }, function() {
      axios.get(host.host + '/api/usuario').then(res => {
        console.log(res.data.data);
        this.setState({
          users: res.data.data
        })
      })
    })
  }

  showData(user) {
    console.log(user);
  }

  newUser() {
    this.setState({
      newUserRow: true
    })
  }

  createUser() {
    this.setState({
      buttons: false
    })
    if (!this.state.newUserRowData.nombre && !this.state.newUserRowData.email && !this.state.newUserRowData.password && !this.state.newUserRowData.password_confirmation && !this.state.newUserRowData.rol_id && !this.state.newUserRowData.area_id) {
      console.log("completar los campos");
      this.setState({
        reason: "Campos Incompletos",
        message: "Completar todos los campos",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.nombre.length == 0) {
      console.log("completar nombres");
      this.setState({
        reason: "Nombre no especificado",
        message: "Completar al campo respectivo",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.email.length == 0) {
      console.log("completar usuario");
      this.setState({
        reason: "Usuario no especifiado",
        message: "Completar al campo respectivo",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.password.length == 0) {
      console.log("completar contraseña");
      this.setState({
        reason: "Contraseña no especificada",
        message: "Completar el campo respectivo",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.password_confirmation.length == 0) {
      console.log("completar contraseña");
      this.setState({
        reason: "Validación de Contraseña no especificada",
        message: "Completar el campo respectivo",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.rol_id == 1) {
      console.log("Seleccionar un Rol");
      this.setState({
        reason: "Rol no especifiado",
        message: "Completar al campo respectivo",
        mensaje: true,
        buttons: true
      })
      return
    }
    if (this.state.newUserRowData.password != this.state.newUserRowData.password_confirmation) {
      console.log("Las contraseñas deben ser iguales");
      this.setState({
        reason: "Contraseñas diferentes",
        message: "Asegúrese que las contraseñas sean iguales",
        mensaje: true,
        buttons: true
      })
      return
    }
    console.log("all correct");
    axios.post(host.host + "/api/usuario/create/general", this.state.newUserRowData).then(res => {
      console.log(res);
      this.componentWillMount();
      this.setState({
        newUserRowData: [],
        newUserRow: false,
        buttons: true,
        reason: "Usuario Creado Correctamente",
        message: res.data.message,
        mensaje: true
      })
    }, error => {
      this.setState({
        buttons: true,
        reason: "Nombre de usuario ya tomado",
        message: error.response.data.message,
        mensaje: true
      })
    })
  }

  setNewUserRowData = (data) => {
    console.log(data);
    this.setState({
      newUserRowData: data
    })
  }

  closeMessage() {
    this.setState({
      mensaje: false
    })
  }

  render() {
    return(
      <div>
        <table class="ui compact celled definition table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {

              return(
                <AdminUsersRow
                  reload = {this.componentWillMount.bind(this)}
                  data = {user}
                />
              )

            })}
          </tbody>
          <tfoot class="full-width">
            {this.state.mensaje ?
              <tr>
                <th colspan="4">
                  <Mensaje
                    reason = {this.state.reason}
                    message = {this.state.message}
                    closeMessage = {this.closeMessage.bind(this)}
                  />
                </th>
              </tr>
              : null
            }
            {this.state.newUserRow ?
              <AdminUsersNewRow
              setNewUserRowData = {this.setNewUserRowData}/>
              : null
            }
            <tr>
              <th></th>
                <th colspan="4">
                  {this.state.newUserRow ?
                    <div class="ui right floated buttons">
                      {this.state.buttons ?
                        <button class="ui negative button">Cancel</button>
                        :
                        <button class="ui negative disabled button">Cancel</button>
                      }
                      <div class="or"></div>
                      {this.state.buttons ?
                        <button class="ui positive button" onClick={this.createUser.bind(this)}>Save</button>
                        :
                        <button class="ui positive disabled button" onClick={this.createUser.bind(this)}>Save</button>
                      }
                    </div>
                    :
                    <div class="ui right floated small primary labeled icon button" onClick={this.newUser.bind(this)}>
                      <i class="user icon"></i> Crear Usuario
                    </div>
                  }
                </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

}
