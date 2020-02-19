import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class OT_RequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: ""
    }
  }

  componentWillMount() {
    this.setState({
      color: this.props.color
    })
  }

  sendPercent = () => {
    var newPercent = 0  ;
    axios.put(host.host + '/api/otes/requerimiento/conteo/' + this.props.data.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      if (this.state.color == "#737373") {
        console.log(this.props.tableColor);
        this.setState({
          color: this.props.tableColor
        })
      } else if (this.state.color == this.props.tableColor) {
        console.log("#737373");
        this.setState({
          color: "#737373"
        })
      }
      newPercent = res.data;
      this.props.setPercent(newPercent);
    })
  }

  sendRequirement = () => {
    this.props.selectRequirement(this.props.data);
  }

  render() {
    return(
      <tr onClick={this.sendRequirement}>
        <td>{this.props.data.descripcion}</td>
        {this.props.rol == 5 && this.props.state == 2 ?
          <td className="right aligned collapsing" onClick={this.sendPercent}>
            <div className="ui small basic icon buttons">
              <button className="ui button"><i style={{color: this.state.color}} className="check icon"></i></button>
            </div>
          </td>
          :
          <div>
            {this.state.color != "#737373" ?
              <i style={{color: this.state.color}} className="check icon"></i>
              : null
            }
          </div>
        }
      </tr>
    )
  }

}
