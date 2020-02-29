import React, { Component } from 'react';
import "./style/AdminStyle.css";

export default class AdminUsersNewRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      email: "",
      password: "",
      password_confirmation: "",
      rol_id: 1,
      area_id: 0,
    }
  }

  componentWillMount() {

  }

  selectRol = (e) => {
    console.log(e.target.value);
    this.setState({
      rol_id: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  selectArea = (e) => {
    this.setState({
      area_id: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  changeName(e) {
    this.setState({
      nombre: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  changeUser(e) {
    this.setState({
      email: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  changePassword(e) {
    this.setState({
      password: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  changeConfirmPassword(e) {
    this.setState({
      password_confirmation: e.target.value
    }, function() {
      this.props.setNewUserRowData(this.state)
    })
  }

  render() {

    let roles = [
      "Sin Asignar",
      "Administrador",
      "Jefe de Área",
      "Jefe de Almacén",
      "Supervisor de Patio",
      "Jefe de Mantenimiento",
      "Gerencia"
    ]

    let areas = [
      "Sin Área",
      "Estructuras",
      "Aceite",
      "Neumáticos",
      "Pesada",
      "Liviana",
      "Gas",
      "Frios"
    ]

    return(
      <tr>
      {this.state.rol_id === 3 ?
        <th colspan="4">
          <input className="adminInput six" type="text" placeholder="Nombres y Apellidos" onChange={this.changeName.bind(this)}/>
          <input className="adminInput six" type="text" placeholder="Usuario" onChange={this.changeUser.bind(this)}/>
          <input className="adminInput six" type="password" placeholder="Contraseña" onChange={this.changePassword.bind(this)}/>
          <input className="adminInput six" type="password" placeholder="Confirm Contraseña" onChange={this.changeConfirmPassword.bind(this)}/>
          <select className="adminInput six" onChange={this.selectRol}>
            {roles.map((rol, id) => {
                return (
                  <option value={id + 1}>{rol}</option>
                )
            })}
          </select>
          <select className="adminInput six" onChange={this.selectArea}>
            {areas.map((area, id) => {
                return (
                  <option value={id}>{area}</option>
                )
            })}
          </select>
        </th>
        :
        <th colSpan="4">
          <input className="adminInput five" type="text" placeholder="Nombres y Apellidos" onChange={this.changeName.bind(this)}/>
          <input className="adminInput five" type="text" placeholder="Usuario" onChange={this.changeUser.bind(this)}/>
          <input className="adminInput five" type="password" placeholder="Contraseña" onChange={this.changePassword.bind(this)}/>
          <input className="adminInput five" type="password" placeholder="Confirm Password" onChange={this.changeConfirmPassword.bind(this)}/>
          <select className="adminInput five" onChange={this.selectRol}>
            {roles.map((rol, id) => {
                return (
                  <option value={id + 1}>{rol}</option>
                )
            })}
          </select>
        </th>
      }
      </tr>
    )
  }

}
