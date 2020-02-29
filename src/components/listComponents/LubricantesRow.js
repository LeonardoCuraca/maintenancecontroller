import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminUsersRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detalle: "",
      observaciones: "",
      estado: 0,
      fecha: "",
      fecha_revision: "",
      fecha_estimada_retorno: "",
      km_actual: "",
      km_estimado: "",
      km_suma: "",
      sede: "",
      conductor: "",
      placa: "",
      correlativo: "",
      marca: ""
    }
  }

  componentWillMount() {
    this.setState({
      detalle: this.props.data.detalle,
      observaciones: this.props.data.observaciones,
      estado: this.props.data.estado,
      fecha: this.props.data.fecha,
      fecha_revision: this.props.data.fecha_revision,
      fecha_estimada_retorno: this.props.data.fecha_estimada_retorno,
      km_actual: this.props.data.km_actual,
      km_estimado: this.props.data.km_estimado,
      km_suma: this.props.data.km_suma,
      sede: this.props.data.sede
    })
    axios.get(host.host + '/api/otes/' + this.props.data.ot_id).then(res => {
      this.setState({
        conductor: res.data[0].conductor,
        placa: res.data[0].vehiculo_id,
        correlativo: res.data[0].correlativo
      })
      axios.get(host.host + '/api/vehiculo/marca/' + res.data[0].vehiculo_id).then(res => {
        this.setState({
          marca: res.data
        })
      })
    })
  }

  showData() {
    console.log(this.state);
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
        <td>{this.state.correlativo}</td>
        <td>{this.state.detalle}</td>
        <td>{this.state.observaciones}</td>
        <td>{this.state.conductor}</td>
        <td>{this.state.estado}</td>
        <td>{this.state.fecha}</td>
        <td>{this.state.fecha_revision}</td>
        <td>{this.state.fecha_estimada_retorno}</td>
        <td>{this.state.km_actual}</td>
        <td>{this.state.km_estimado}</td>
        <td>{this.state.km_suma}</td>
        <td>{this.state.sede}</td>
        <td>{this.state.placa}</td>
        <td>{this.state.marca}</td>
      </tr>
    )
  }

}
