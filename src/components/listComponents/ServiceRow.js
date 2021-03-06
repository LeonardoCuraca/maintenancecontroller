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

  deleteRow(id) {
    this.props.deleteRow(id)
  }

  componentWillMount() {
    this.setState({
      color: this.props.color
    })
  }

  sendPercent = () => {
    var newPercent = 0  ;
    axios.put(host.host + '/api/otes/tarea/conteo/' + this.props.data.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      if (this.state.color === "#737373") {
        console.log(this.props.tableColor);
        this.setState({
          color: this.props.tableColor
        })
      } else if (this.state.color === this.props.tableColor) {
        console.log("#737373");
        this.setState({
          color: "#737373"
        })
      }
      newPercent = res.data
      this.props.setPercent(newPercent)
    })
  }

  sendService = () => {
    this.props.selectService(this.props.data);
  }

  render() {
    return(
      <tr>
        <td className="right aligned collapsing" style={{zIndex: 30}} onClick={this.sendService}>
          <div className="ui small basic icon buttons">
            <button className="ui button"><i className="right chevron icon"></i></button>
          </div>
        </td>
        <td style={{verticalAlign: "middle"}}>{this.props.data.descripcion}</td>
        {this.props.state === 4 && this.props.rol === 5 ?
          <td className="right aligned collapsing" style={{zIndex: 30}} onClick={this.deleteRow.bind(this, this.props.data.id)}>
            <div className="ui small basic icon buttons">
              <button className="ui button"><i style={{color: "red"}} class="trash alternate outline icon"></i></button>
            </div>
          </td>
          : null
        }
        {this.props.rol === 5 && this.props.state === 4 ?
          <td className="right aligned collapsing" onClick={this.sendPercent}>
            <div className="ui small basic icon buttons">
              <button className="ui button"><i style={{color: this.state.color}} className="check icon"></i></button>
            </div>
          </td>
          : null
        }
        {(this.props.state === 5 || this.props.state === 6) && this.props.rol === 5 && this.state.color != "#737373" ?
          <td className="right aligned collapsing" style={{zIndex: 30}}>
            <div className="ui small basic icon buttons">
              <button className="ui button"><i style={{color: this.state.color}} className="check icon"></i></button>
            </div>
          </td>
          : null
        }
      </tr>
    )
  }

}
