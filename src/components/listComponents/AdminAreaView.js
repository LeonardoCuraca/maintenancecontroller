import React, { Component } from 'react';
import axios from 'axios';

import AdminAreaRow from "./AdminAreaRow";
import Mensaje from "./Mensaje";

import * as host from '../host';

export default class AdminAreaView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      areas: [],
      mensaje: false
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/area').then(res => {
      this.setState({
        areas: res.data.data
      })
    })
  }

  setNewEmployeeRowData = (data) => {
    console.log(data);
    this.setState({
      newEmployeeRowData: data
    })
  }

  newEmployee() {
    this.setState({
      newEmployeeRow: true
    })
  }

  closeMessage() {
    this.setState({
      mensaje: false
    })
  }

  createEmployee() {
    this.setState({
      buttons: false
    })
    if ((!this.state.newEmployeeRowData.nombres && !this.state.newEmployeeRowData.apellidos && !this.state.newEmployeeRowData.area_id) || (this.state.newEmployeeRowData.nombres.length == 0 || this.state.newEmployeeRowData.apellidos.length == 0 || this.state.newEmployeeRowData.area_id == 0)) {
      this.setState({
        reason: "Campos Incompletos",
        message: "Completar todos los campos requeridos",
        mensaje: true,
        buttons: true
      })
      return
    }
    axios.post(host.host + "/api/empleado/crear", this.state.newEmployeeRowData).then(res => {
      console.log(res);
      this.componentWillMount();
      this.setState({
        newEmployeeRowData: [],
        newEmployeeRow: false,
        buttons: true,
        reason: "Usuario Creado Correctamente",
        message: res.data.message,
        mensaje: true
      })
    })
  }

  render() {

    return(
      <div>
        <table class="ui compact celled table">
          <thead>
            <tr>
              <th>Área</th>
              <th>Encargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.areas.map(area => {

              return(
                <AdminAreaRow
                  reload = {this.componentWillMount.bind(this)}
                  data = {area}
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
          </tfoot>
        </table>
      </div>
    )
  }

}
