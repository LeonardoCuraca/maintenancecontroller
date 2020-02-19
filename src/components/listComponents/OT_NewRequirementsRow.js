import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class OT_RequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newRequirement: ""
    }
  }

  componentWillMount() {

  }

  changeNewRequirement(e) {
    this.setState({
      newRequirement: e.target.value
    })
  }

  createNewRequirement() {
    var data = {
      descripcion: this.state.newRequirement,
      conformidad: 0,
      observaciones: " ",
      ot_id: this.props.otid
    }
    axios.post(host.host + '/api/reque/crear', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.props.reload();
    })
  }

  render() {
    return(
      <tr>
        <td><input style={{width: "100%"}} type="text" value={this.state.newRequirement} onChange={this.changeNewRequirement.bind(this)}/></td>
        <td className="right aligned collapsing">
          <div className="ui small basic icon buttons">
            <button onClick={this.createNewRequirement.bind(this)} className="ui button"><i className="add icon"></i></button>
          </div>
        </td>
      </tr>
    )
  }

}
