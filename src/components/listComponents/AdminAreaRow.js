import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class AdminAreaRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      employeesList: [],
      employeeFullName: "",
      confirmButton: false,
      selectedEmployee: 0
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/usuario/jefearea/listado').then(res => {
      console.log(res.data);
      this.setState({
        employeesList: res.data
      })
    })
    console.log(host.host + '/api/usuario/' + this.props.data.encargado_id);
    axios.get(host.host + '/api/usuario/' + this.props.data.encargado_id).then(res => {
      console.log(res.data);
      this.setState({
        employeeFullName: res.data[0].nombre
      })
    })
  }

  showData() {
    console.log(this.state);
  }

  selectEmpployee(e) {
    this.setState({
      selectedEmployee: e.target.value,
      confirmButton: true
    })
  }

  toggleEdit() {
    this.setState({
      edit: !this.state.edit
    })
  }

  setEmployee() {
    console.log(this.state.selectedEmployee);
    axios.put(host.host + '/api/area/reasignar/' + this.props.data.id + '/' + this.state.selectedEmployee).then(res => {
      console.log(res);
      this.setState({
        edit: false,
        confirmButton: false
      })
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
        <td>{this.props.data.nombre}</td>
        {this.state.edit ?
          <td>
            <select className="adminInput three" onChange={this.selectEmpployee.bind(this)}>
              {this.state.employeesList.map((employee, id) => {
                  return (
                    <option value={employee.id}>{employee.nombre}</option>
                  )
              })}
            </select>
            {this.state.confirmButton ?
              <button onClick={this.setEmployee.bind(this)}>Actualizar</button>
              : null
            }
          </td>
          :
          <td>{this.state.employeeFullName}</td>
        }
        <td><a style={{cursor: "pointer"}} onClick={this.toggleEdit.bind(this)}>Editar</a></td>
      </tr>
    )
  }

}
