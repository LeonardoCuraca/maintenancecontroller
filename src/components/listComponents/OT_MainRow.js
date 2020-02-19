import React, { Component } from 'react';
import axios from 'axios';
import history from "../../history";

import "./style/MainRowStyle.css";

export default class OT_MainRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rowData
    }
  }

  showDetail() {
    history.push("ot_detail/" + this.state.data.id)
  }

  render() {
    return(
      <tr className="mainRow" onClick={this.showDetail.bind(this)}>
        <td>{this.state.data.id}</td>
        <td>{this.state.data.fecha_ingreso}</td>
        <td>{this.state.data.h_ingreso}</td>
        <td>{this.state.data.vehiculo_id}</td>
        <td>{this.state.data.tipo_vehiculo}</td>
        <td>{this.state.data.acoplado}</td>
        <td>{this.state.data.operacion}</td>
        <td>{this.state.data.area_id}</td>
        <td>{this.state.data.conductor}</td>
        <td>{this.state.data.dni}</td>
        <td className="center aligned"><a style={{backgroundColor: this.props.backgroundColor}} class="ui empty circular label"></a></td>
      </tr>
    )
  }
}
