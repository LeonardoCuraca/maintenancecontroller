import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminUsersRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      email: "",
      estado: "",
      rol_id: "",
      color: ""
    }
  }

  componentWillMount() {
    console.log(this.props.data.estado);
    this.setState({
      nombre: this.props.data.nombre,
      email: this.props.data.email,
      estado: this.props.data.estado,
      rol_id: this.props.data.rol_id
    })
    if (this.props.data.rol_id === 1) {
      this.setState({
        color: "red"
      })
    }
  }

  showData() {
    console.log(this.state);
  }

  toggleState() {
    axios.put(host.host + '/api/usuario/cambio/estado/' + this.props.data.id).then(res => {
      console.log(res.data);
      this.props.reload();
    })
  }

  render() {

    let roles = [
      "No Asignado",
      "Administrador",
      "Jefe de Área",
      "Jefe de Almacén",
      "Supervisor de Patio",
      "Jefe de Mantenimiento",
      "Gerencia"
    ]

    return(
      <tr onClick={this.showData.bind(this)}>
          <td class="collapsing" onChange={this.toggleState.bind(this)}>
            {this.state.estado == 1 ?
              <div class="ui fitted slider checkbox">
                <input type="checkbox" checked onChange={this.toggleState.bind(this)} /><label></label>
              </div>
              :
              <div class="ui fitted slider checkbox">
                <input type="checkbox" onChange={this.toggleState.bind(this)} /><label></label>
              </div>
            }
          </td>
        <td>{this.state.nombre}</td>
        <td>{this.state.email}</td>
        <td style={{color: this.state.color}}>{roles[this.state.rol_id - 1]}</td>
      </tr>
    )
  }

}
