import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class OT_RequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "",
      data: [],
      asigned: false
    }
  }

  componentWillMount() {

  }

  asignEmployee = (id) => {
    this.props.asignEmployee(id)
  }

  setEmployee(id) {
    this.asignEmployee(id);
    if (this.state.asigned == true) {
      this.setState({
        color: "",
        asigned: false
      })
    } else {
      this.setState({
        color: "#16a1b75c",
        asigned: true
      })
    }
  }

  render() {
    return(
      <tr onClick={this.setEmployee.bind(this, this.props.row.id)}>
        <td style={{background: this.state.color}}>{this.props.row.nombres} {this.props.row.apellidos}</td>
      </tr>
    )
  }

}
