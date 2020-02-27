import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminUsersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/usuario').then(res => {
      this.setState({
        users: res.data.data
      })
    })
  }

  render() {

    let roles = [
      "",
      "Administrador",
      "Jefe de Área",
      "Jefe de Almacén",
      "Supervisor de Patio",
      "Jefe de Mantenimiento",
      "Gerencia"
    ]

    return(
      <div>
        <table class="ui compact celled definition table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {

              return(
                <tr>
                  <td class="collapsing">
                    <div class="ui fitted slider checkbox">
                      <input type="checkbox"/> <label></label>
                    </div>
                  </td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.estado}</td>
                  <td>{roles[user.rol]}</td>
                </tr>
              )

            })}
          </tbody>
          <tfoot class="full-width">
            <tr>
              <th></th>
              <th colspan="4">
                <div class="ui right floated small primary labeled icon button">
                  <i class="user icon"></i> Add User
                </div>
                <div class="ui small button">
                  Approve
                </div>
                <div class="ui small  disabled button">
                  Approve All
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

}
