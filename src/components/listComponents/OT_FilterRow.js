import React, { Component } from 'react';
import axios from 'axios';
import "./style/OT_FilterRow.css";

export default class OT_FilterRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rowData: this.props.data,
      infoView: false
    }
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }


  render() {
    console.log(this.state.rowData);
    return(
      <tr className="tableRow" onClick={this.props.showInfo}>
        <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.correlativo}</td>
        {this.props.data.placa_temporal ?
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.placa_temporal}</td>
          :
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.vehiculo_id}</td>
        }
        <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.tipo_vehiculo}</td>
        <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.operacion}</td>
        {this.props.state != 4 ?
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">
            {Math.round(this.state.rowData.aprobadas)}%
          </td>
          :
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">
            {Math.round(this.state.rowData.progreso_tareas)}%
          </td>
        }
        {this.props.state == 1 ?
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.fecha_ingreso}</td>
          : null
        }
        {this.props.state == 1 ?
          <td style={{paddingTop: "12px", paddingBottom: "12px"}} className="">{this.state.rowData.h_ingreso}</td>
          : null
        }
      </tr>
    )
  }

}
