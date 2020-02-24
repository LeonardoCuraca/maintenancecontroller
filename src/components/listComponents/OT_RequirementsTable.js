import React, { Component } from 'react';
import axios from 'axios';
import OT_RequirementsRow from "./OT_RequirementsRow";
import OT_NewRequirementsRow from "./OT_NewRequirementsRow";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as host from '../host';

export default class OT_RequirementsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      percent: 0,
      newRequirement: false,
      selectedRequirement: [],
      tempObservacion: ""
    }
  }

  componentWillMount() {
    console.log(this.props.state);
    axios.get(host.host + '/api/reque/' + this.props.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      var total = 0;
      var complete = 0;
      for (var i = 0; i < res.data.length; i++) {
        total = total + 1;
        if (res.data[i].conformidad == 1) {
          complete = complete + 1;
        }
      }
      this.setState({
        data: res.data,
        percent: (complete / total) * 100
      }, function() {
        this.setPercent(this.state.percent);
      })
    });
  }

  reload() {
    console.log("recargando");
    this.setState({
      selectedRequirement: [],
      tempObservacion: ""
    })
    axios.get(host.host + '/api/reque/' + this.props.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      var total = 0;
      var complete = 0;
      for (var i = 0; i < res.data.length; i++) {
        total = total + 1;
        if (res.data[i].conformidad == 1) {
          complete = complete + 1;
        }
      }
      if (this.state.newRequirement === true) {
        this.setState({
          newRequirement: !this.state.newRequirement
        })
      }
      this.setState({
        data: null,
      }, function() {
        this.setState({
          data: res.data,
          percent: (complete / total) * 100
        }, function() {
          this.setPercent(this.state.percent);
        })
      })
    });
  }

  setPercent = (newPercent) => {
    this.setState({
      percent: newPercent
    })
    this.props.reload();
  }

  deleteRow = (id) => {
    axios.delete(host.host + "/api/reque/eliminar/" + id).then(res => {
      console.log(res);
      this.reload();
    })
  }

  selectRequirement = (req) => {
    if (req.id == this.state.selectedRequirement.id) {
      this.setState({
        selectedRequirement: [],
        tempObservacion: ""
      })
      return
    }
    axios.get(host.host + "/api/reque/find/" + req.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        selectedRequirement: []
      }, function() {
        this.setState({
          selectedRequirement: res.data[0],
          tempObservacion: res.data[0].observaciones
        }, function() {
          console.log(this.state.selectedRequirement);
          console.log(this.state.tempObservacion);
        })
      })
    })
  }

  toggleNewRequirement() {
    this.setState({
      newRequirement: !this.state.newRequirement
    })
  }

  changeReview(e) {
    this.setState({
      tempObservacion: e.target.value
    })
  }

  updateObservacion() {
    var data = {
      observaciones: this.state.tempObservacion
    }
    axios.put(host.host + "/api/reque/observacion/actualizar/" + this.state.selectedRequirement.id, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.setState({
        selectedRequirement: {
          observaciones: res.data
        }
      }, function() {
        console.log(this.state.tempObservacion);
        console.log(this.state.selectedRequirement.observaciones);
      })
    })
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
              <th colspan="4">
                Prediagnóstico
                {this.props.rol == 5 && this.props.state == 1 ?
                  <a style={{float: "right", cursor: "pointer"}} class="item" onClick={this.toggleNewRequirement.bind(this)}>
                    <i class="icon add"></i>
                  </a>
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
                  <OT_RequirementsRow
                    data = {row}
                    color = {color}
                    tableColor = {this.props.color}
                    deleteRow = {this.deleteRow}
                    setPercent = {this.setPercent}
                    selectRequirement = {this.selectRequirement}
                    rol = {this.props.rol}
                    state = {this.props.state}
                  />
                )
              })}
              {this.state.newRequirement ?
                <OT_NewRequirementsRow
                  otid = {this.props.id}
                  reload = {this.reload.bind(this)}
                  rol = {this.props.rol}
                />
                : null
              }
            </tbody>
            : null
          }
        </table>
        {this.state.selectedRequirement.length != 0 ?
          <TextareaAutosize style={{width: "100%", marginTop: "-16px"}} aria-label="empty textarea" placeholder="Observaciones" defaultValue={this.state.tempObservacion} onChange={this.changeReview.bind(this)} />
          : null
        }
        {(this.state.tempObservacion != this.state.selectedRequirement.observaciones) && this.state.selectedRequirement.length != 0 ?
          <button onClick={this.updateObservacion.bind(this)}>Actualizar</button>
          : null
        }
      </div>
    )
  }

}
