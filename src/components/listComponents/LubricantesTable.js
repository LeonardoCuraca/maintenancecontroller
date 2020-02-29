import React, { Component } from 'react';
import axios from 'axios';

import LubricantesNewRow from "./LubricantesNewRow";
import LubricantesRow from "./LubricantesRow";
import Mensaje from "./Mensaje";

import * as host from '../host';

export default class LubricantesTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reg: [],
      newUserRow: false,
      newUserRowData: [],
      buttons: true,
      reason: "",
      message: "",
      mensaje: false
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/lubricacion').then(res => {
      console.log(res.data.data);
      this.setState({
        reg: res.data.data
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
    if (!this.state.newUserRowData.correlativo || !this.state.newUserRowData.detalle || !this.state.newUserRowData.observaciones || !this.state.newUserRowData.fecha || !this.state.newUserRowData.fecha_revision  || !this.state.newUserRowData.fecha_estimada_retorno || !this.state.newUserRowData.km_actual || !this.state.newUserRowData.km_estimado || !this.state.newUserRowData.sede || this.state.newUserRowData.correlativo == "" || this.state.newUserRowData.detalle == "" ||  this.state.newUserRowData.fecha == "" || this.state.newUserRowData.fecha_revision == ""  || this.state.newUserRowData.fecha_estimada_retorno == "" || this.state.newUserRowData.km_actual == "" || this.state.newUserRowData.km_estimado == "" || this.state.newUserRowData.sede == "") {
      console.log("completar los campos");
      this.setState({
        reason: "Campos Incompletos",
        message: "Complete todos los campos necesarios",
        mensaje: true,
        buttons: true
      })
      return
    }
    console.log("all correct");
    axios.post(host.host + "/api/lubricacion/ote/crear", this.state.newUserRowData).then(res => {
      console.log(res);
      this.componentWillMount();
      this.setState({
        newUserRowData: [],
        newUserRow: false,
        buttons: true,
        reason: "Reporte Creado Correctamente",
        message: res.data.message,
        mensaje: true
      })
    })
  }

  setNewEmployeeRowData = (data) => {
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
        <table class="ui compact celled table">
          <thead>
            <tr>
              <th>Correlativo</th>
              <th>Detalle</th>
              <th>Observaciones</th>
              <th>Conductor</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Fecha Revisión</th>
              <th>Fecha Estimada de Retorno</th>
              <th>Kilometraje Actual</th>
              <th>Kilometraje Estimado</th>
              <th>Kilometraje al Retornar</th>
              <th>Sede</th>
              <th>Placa</th>
              <th>Marca</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reg.map(reg => {

              return(
                <LubricantesRow
                  data = {reg}
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
              <LubricantesNewRow
              setNewEmployeeRowData = {this.setNewEmployeeRowData}/>
              : null
            }
            <tr>
              <th></th>
                <th colspan="14">
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
                      <i class="user icon"></i> Nuevo Reporte
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
