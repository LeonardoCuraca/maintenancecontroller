import React, { Component } from 'react';
import axios from 'axios';

import AdminEmployeesNewRow from "./AdminEmployeesNewRow";
import AdminEmployeesRow from "./AdminEmployeesRow";
import Mensaje from "./Mensaje";

import * as host from '../host';

export default class AdminEmployeesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      newEmployeeRowData: [],
      newEmployeeRow: false,
      buttons: true,
      mensaje: false
    }
  }

  componentWillMount() {
    this.setState({
      employees: []
    }, function() {
      axios.get(host.host + '/api/empleado').then(res => {
        this.setState({
          employees: res.data.data
        })
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
        <table class="ui compact celled definition table">
          <thead>
            <tr>
              <th></th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Área</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => {

              return(
                <AdminEmployeesRow
                  reload = {this.componentWillMount.bind(this)}
                  data = {employee}
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
            {this.state.newEmployeeRow ?
              <AdminEmployeesNewRow
              setNewEmployeeRowData = {this.setNewEmployeeRowData}/>
              : null
            }
            <tr>
              <th></th>
                <th colspan="4">
                  {this.state.newEmployeeRow ?
                    <div class="ui right floated buttons">
                      {this.state.buttons ?
                        <button class="ui negative button">Cancel</button>
                        :
                        <button class="ui negative disabled button">Cancel</button>
                      }
                      <div class="or"></div>
                      {this.state.buttons ?
                        <button class="ui positive button" onClick={this.createEmployee.bind(this)}>Save</button>
                        :
                        <button class="ui positive disabled button" onClick={this.createEmployee.bind(this)}>Save</button>
                      }
                    </div>
                    :
                    <div class="ui right floated small primary labeled icon button" onClick={this.newEmployee.bind(this)}>
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
