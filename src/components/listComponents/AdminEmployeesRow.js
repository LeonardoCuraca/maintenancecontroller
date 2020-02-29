import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminEmployeesRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombres: "",
      apellidos: "",
      estado: 2,
      area_id: 0
    }
  }

  componentWillMount() {
    this.setState({
      nombres: this.props.data.nombres,
      apellidos: this.props.data.apellidos,
      estado: this.props.data.estado,
      area_id: this.props.data.area_id
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

  toggleEmployeeState() {
    axios.put(host.host + '/api/empleado/cambio/estado/' + this.props.data.id).then(res => {
      console.log(res);
      this.props.reload();
    })
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

    return(
      <tr onClick={this.showData.bind(this)}>
      <div class="ui segment">
        <p></p>
        <div class="ui active dimmer">
          <div class="ui loader"></div>
        </div>
      </div>
        {this.state.estado == 1 ?
          <td class="collapsing">
            <div class="ui fitted slider checkbox">
              <input type="checkbox" checked onChange={this.toggleEmployeeState.bind(this)} /><label></label>
            </div>
          </td>
          :
          <td class="collapsing">
            <div class="ui fitted slider checkbox">
              <input type="checkbox" onChange={this.toggleEmployeeState.bind(this)} /><label></label>
            </div>
          </td>
        }
        <td>{this.state.nombres}</td>
        <td>{this.state.apellidos}</td>
        <td>{areas[this.state.area_id]}</td>
      </tr>
    )
  }

}
