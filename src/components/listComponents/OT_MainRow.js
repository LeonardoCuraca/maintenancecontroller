import React, { Component } from 'react';
import history from "../../history";

import "./style/MainRowStyle.css";

export default class OT_MainRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rowData
    }
  }

  componentWillMount() {
    console.log(this.props.rowData);
  }

  showDetail() {
    history.push("ot_detail/" + this.state.data.id)
  }

  render() {
    let areas = [
      "",
      "Estructuras",
      "Aceite",
      "Neumáticos",
      "Pesada",
      "Liviana",
      "Gas",
      "Frios"
    ]
    let tipos = [
      "",
      "Motocicleta",
      "Remolcador",
      "Semiremolque",
      "Camión",
      "Camioneta",
      "Van",
      "Microbus",
      "Minivan",
      "Bus"
    ]
    return(
      <tr className="mainRow" onClick={this.showDetail.bind(this)}>
        <td>{this.state.data.correlativo}</td>
        <td>{this.state.data.fecha_ingreso}</td>
        <td>{this.state.data.h_ingreso}</td>
        {this.state.data.vehiculo_id ?
          <td>{this.state.data.vehiculo_id}</td>
          :
          <td>{this.state.data.placa_temporal}</td>
        }
        <td>{this.state.data.tipo_vehiculo}</td>
        <td>{this.state.data.acoplado}</td>
        <td>{this.state.data.operacion}</td>
        <td>{areas[this.state.data.area_id]}</td>
        <td>{this.state.data.conductor}</td>
        <td>{this.state.data.dni}</td>
        <td className="center aligned"><a style={{backgroundColor: this.props.backgroundColor}} class="ui empty circular label"></a></td>
      </tr>
    )
  }
}
