import React, { Component } from 'react';
import axios from 'axios';
import * as host from '../host';

export default class OT_RequirementsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTarea: ""
    }
  }

  componentWillMount() {

  }

  changeNewTarea(e) {
    this.setState({
      newTarea: e.target.value
    })
  }

  createNewTarea() {
    var data = {
      descripcion: this.state.newTarea,
      conformidad: 0,
      observaciones: "",
      ot_id: this.props.otid
    }
    axios.post(host.host + '/api/tarea/crear', data, {
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
        <td colspan="3"><input style={{width: "100%"}} type="text" value={this.state.newTarea} onChange={this.changeNewTarea.bind(this)}/></td>
        <td className="right aligned collapsing">
          <div className="ui small basic icon buttons">
            <button onClick={this.createNewTarea.bind(this)} className="ui button"><i className="add icon"></i></button>
          </div>
        </td>
      </tr>
    )
  }

}
