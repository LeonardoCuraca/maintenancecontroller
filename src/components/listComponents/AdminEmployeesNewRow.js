import React, { Component } from 'react';
import "./style/AdminStyle.css";

export default class AdminEmployeesNewRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombres: "",
      apellidos: "",
      area_id: 0,
    }
  }

  componentWillMount() {

  }

  selectArea = (e) => {
    this.setState({
      area_id: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeNombres(e) {
    this.setState({
      nombres: e.target.value
    }, function() {
      this.props.setNewEmployeeRowData(this.state)
    })
  }

  changeApellidos(e) {
    this.setState({
      apellidos: e.target.value
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
        <th colspan="4">
          <input className="adminInput three" type="text" placeholder="Nombres" onChange={this.changeNombres.bind(this)}/>
          <input className="adminInput three" type="text" placeholder="Apellidos" onChange={this.changeApellidos.bind(this)}/>
          <select className="adminInput three" onChange={this.selectArea}>
            {areas.map((area, id) => {
                return (
                  <option value={id}>{area}</option>
                )
            })}
          </select>
        </th>
      </tr>
    )
  }

}
