import React, { Component } from 'react';
import axios from 'axios';
import OT_MaterialRow from "./OT_MaterialRow";
import * as host from '../host';

export default class OT_RequirementsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      materiales: [],
      percent: 0,
      newRequirement: false
    }
  }

  componentWillMount() {
    console.log(this.props.ot);
    axios.get(host.host + '/api/solicitud/ote/' + this.props.ot, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data[0]);
      axios.get(host.host + '/api/m_solicitado/solicitud/' + res.data[0].id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        this.setState({
          materiales: res.data
        }, function() {
          console.log(this.state.materiales);
        })
      })
    });
  }

  reload() {
    axios.get(host.host + '/api/solicitud/ote/' + this.props.ot, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data[0]);
      axios.get(host.host + '/api/m_solicitado/solicitud/' + res.data[0].id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        this.setState({
          materiales: res.data
        }, function() {
          console.log(this.state.materiales);
        })
      })
    });
  }

  despachar() {
    let estado = {
      estado: 4
    }
    axios.put(host.host + '/api/otes/estado/actualizar/' + this.props.ot, estado, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      window.location.reload();
    })
  }

  render() {
    return(
      <div>
        <div style={{marginBottom: "-16px"}} className="ui top attached progress">
          <div style={{width: "100%", backgroundColor: "#29a643"}} className="bar"></div>
        </div>
        <table className="ui table">
          <thead>
            <tr>
              <th colspan="6">
                Materiales Solicitados
              </th>
              <th colspan="6">
                Código del Producto
              </th>
            </tr>
          </thead>
          {this.state.materiales != null?
            <tbody>
              {this.state.materiales.map(row => {
                return(
                  <OT_MaterialRow
                    data = {row}
                    rol = {this.props.rol}
                  />
                )
              })}
            </tbody>
            : null
          }
        </table>
        <div style={{marginTop: "-16px"}}><button className="ui button" style={{width: "100%"}} onClick={this.despachar.bind(this)}>Finalizar</button></div>
      </div>
    )
  }

}
