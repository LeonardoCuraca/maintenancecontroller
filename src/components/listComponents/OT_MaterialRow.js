import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

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
        <td colspan="6">{this.props.data.asignada} ({this.props.data.cantidad_asignada})</td>
        {this.props.rol == 4 ?
          <td colspan="6">
            <input type="text" placeholder="c ó d i g o" value={this.state.material.material_id} onChange={this.changeRow.bind(this)}/>
            <div className="ui small basic icon buttons" onClick={this.saveCode.bind(this)}>
              <button className="ui button"><i style={{color: this.state.color}} className="check icon"></i></button>
            </div>
          </td>
          : null
        }
      </tr>
    )
  }

}
