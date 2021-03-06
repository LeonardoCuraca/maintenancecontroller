import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

import { Input } from "reactstrap";

export default class OT_RequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "#f3f3f3",
      material: [],
      codTemp: null
    }
  }

  componentWillMount() {
    this.setState({
      material: this.props.data,
      codTemp: this.props.data.material_id
    }, function() {
      console.log(this.state.codTemp);
      if (this.state.material.material_id != null) {
        this.setState({
          color: "#29a643"
        })
      }
    })
  }

  changeRow(e) {
    var temp = this.state.material;
    temp.material_id = e.target.value;
    console.log(e.target.value);
    console.log(this.state.codTemp);
    this.setState({
      material: temp
    }, function() {
      if (temp.material_id == "") {
        console.log("xdxdxdxd");
        this.setState({
          color: "#f3f3f3"
        })
        return
      }
      if (temp.material_id == this.state.codTemp) {
        console.log("iguales");
        this.setState({
          color: "#29a643"
        })
      } else {
        console.log("distintos");
        this.setState({
          color: "#f3f3f3"
        })
      }
      console.log(this.state.material);
    })
  }

  saveCode() {
    if (this.state.material.material_id == this.state.codTemp) {
      console.log("stop");
      return
    }
    axios.put(host.host + '/api/m_solicitado/actualizar/' + this.state.material.id, this.state.material, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      if (this.state.material.material_id == "") {
        console.log("null");
        this.setState({
          color: "yellow",
          codTemp: ""
        })
      } else {
        console.log("value");
        this.setState({
          color: "#29a643",
          codTemp: this.state.material.material_id
        })
      }
    })
  }

  render() {
    return(
      <tr>
        <td colspan="6">
          <div className="ui label">
            {this.props.data.asignada}
            <div className="detail">{this.props.data.cantidad_asignada}</div>
          </div>
        </td>
        {this.props.rol == 4 || this.props.rol == 5 ?
          <td colspan="6">
            <div class="ui action input">
              <Input type="text" placeholder="Código" value={this.state.material.material_id} onChange={this.changeRow.bind(this)}/>
              <button class="ui icon button" onClick={this.saveCode.bind(this)}>
                <i style={{color: this.state.color}} className="check icon"></i>
              </button>
            </div>
          </td>
          : null
        }
      </tr>
    )
  }

}
