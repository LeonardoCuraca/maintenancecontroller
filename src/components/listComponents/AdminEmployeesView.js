import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminEmployeesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/empleado').then(res => {
      this.setState({
        employees: res.data.data
      })
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
                <tr>
                  <td class="collapsing">
                    <div class="ui fitted slider checkbox">
                      <input type="checkbox"/> <label></label>
                    </div>
                  </td>
                  <td>{employee.nombres}</td>
                  <td>{employee.apellidos}</td>
                  <td>{areas[employee.area_id]}</td>
                </tr>
              )

            })}
          </tbody>
          <tfoot class="full-width">
            <tr>
              <th></th>
              <th colspan="4">
                <div class="ui right floated small primary labeled icon button">
                  <i class="user icon"></i> Add User
                </div>
                <div class="ui small button">
                  Approve
                </div>
                <div class="ui small  disabled button">
                  Approve All
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

}
