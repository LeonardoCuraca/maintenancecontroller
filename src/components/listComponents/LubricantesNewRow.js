import React, { Component } from 'react';
import "./style/AdminStyle.css";

export default class LubricantesNewRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      correlativo: "",
      detalle: "",
      observaciones: "",
      fecha: "",
      fecha_revision: "",
      fecha_estimada_retorno: "",
      km_actual: "",
      km_estimado: "",
      sede: ""
    }
  }

  componentWillMount() {

  }

  changeCorrelativo(e) {
    this.setState({
      correlativo: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeDetalle(e) {
    this.setState({
      detalle: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeObservaciones(e) {
    this.setState({
      observaciones: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeFecha(e) {
    this.setState({
      fecha: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeRevision(e) {
    this.setState({
      fecha_revision: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeRetorno(e) {
    this.setState({
      fecha_estimada_retorno: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeActual(e) {
    this.setState({
      km_actual: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeEstimado(e) {
    this.setState({
      km_estimado: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeSede(e) {
    this.setState({
      sede: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  render() {

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
        <th colspan="14">
          <input className="adminInput three" type="number" placeholder="Correlativo" onChange={this.changeCorrelativo.bind(this)}/>
          <input className="adminInput three" type="text" placeholder="Detalle" onChange={this.changeDetalle.bind(this)}/>
          <input className="adminInput three" type="text" placeholder="Observaciones" onChange={this.changeObservaciones.bind(this)}/>
          <input className="adminInput three" type="date" placeholder="Fecha" onChange={this.changeFecha.bind(this)}/>
          <input className="adminInput three" type="date" placeholder="Fecha de Revisión" onChange={this.changeRevision.bind(this)}/>
          <input className="adminInput three" type="date" placeholder="Fecha Estimada de Retorno" onChange={this.changeRetorno.bind(this)}/>
          <input className="adminInput three" type="number" placeholder="Kilometraje Actual" onChange={this.changeActual.bind(this)}/>
          <input className="adminInput three" type="number" placeholder="Kilometraje Estimado" onChange={this.changeEstimado.bind(this)}/>
          <input className="adminInput three" type="text" placeholder="Sede" onChange={this.changeSede.bind(this)}/>
        </th>
      </tr>
    )
  }

}
