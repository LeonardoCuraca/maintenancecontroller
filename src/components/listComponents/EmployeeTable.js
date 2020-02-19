import React, { Component } from 'react';
import axios from 'axios';
import OT_RequirementsRow from "./OT_RequirementsRow";
import OT_NewRequirementsRow from "./OT_NewRequirementsRow";
import EmployeeRow from "./EmployeeRow";
import * as host from '../host';

export default class OT_RequirementsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      percent: 0,
      newRequirement: false,
      asignedEmployee: []
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/empleado/area/' + this.props.area, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data
      })
    });
  }

  reload() {
    this.setState({
      data: null
    }, function() {
      axios.get(host.host + '/api/empleado/area/' + this.props.area, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data.data);
        this.setState({
          data: res.data.data
        })
      });
    })
  }

  asignEmployee = (id) => {
    console.log(id);
    if (!this.state.asignedEmployee.includes(id)) {
      this.setState({
        asignEmployee: this.state.asignedEmployee.push(id)
      }, function() {
        console.log(this.state.asignedEmployee);
      })
    } else {
      this.setState({
        asignEmployee: this.state.asignedEmployee.splice( this.state.asignedEmployee.indexOf(id), 1 )
      }, function() {
        console.log(this.state.asignedEmployee);
      })
    }
  }

  confirmEmployees() {
    let estado = {
      estado: 2
    }
    axios.put(host.host + '/api/otes/estado/actualizar/' + this.props.ot, estado, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
    })
    for (var i = 0; i < this.state.asignedEmployee.length; i++) {

      let data = {
        empleado_id: this.state.asignedEmployee[i],
        ot_id: this.props.ot
      }
      axios.post(host.host + '/api/involucrado/crear', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.empleado_id == this.state.asignedEmployee[this.state.asignedEmployee.length - 1]) {
          window.location.reload();
        }
      })
    }
  }

  render() {
    return(
      <div>
        <div style={{marginBottom: "-16px"}} className="ui top attached progress">
          <div style={{width: this.state.percent + "%", backgroundColor: this.props.color, transition: "1.5s"}} className="bar"></div>
        </div>
        <table className="ui table">
          <thead>
            <tr>
              <th colspan="3">
                Trabajadores
                {this.state.asignedEmployee.length > 0 ?
                  <button style={{float: "right"}} onClick={this.confirmEmployees.bind(this)}>Confirmar</button>
                  : null
                }
              </th>
            </tr>
          </thead>
          {this.state.data != null?
            <tbody>
              {this.state.data.map(row => {
                var color = "#737373";
                if (row.conformidad == 1) {
                  color = this.props.color
                }
                return(
                  <EmployeeRow
                    row = {row}
                    ot = {this.props.ot}
                    asignEmployee = {this.asignEmployee}
                  />
                )
              })}
            </tbody>
            : null
          }
        </table>
      </div>
    )
  }

}
