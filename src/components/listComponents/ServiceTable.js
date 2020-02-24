import React, { Component } from 'react';
import axios from 'axios';
import ServiceRow from "./ServiceRow";
import NewServiceRow from "./NewServiceRow";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as host from '../host';

export default class OT_RequirementsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      percent: 0,
      newTarea: false,
      selectedService: [],
      tempObservacion: ""
    }
  }

  componentWillMount() {
    console.log(this.props.id);
    axios.get(host.host + '/api/tarea/' + this.props.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
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

  deleteRow = (id) => {
    axios.delete(host.host + "/api/tarea/eliminar/" + id).then(res => {
      console.log(res);
      this.reload();
    })
  }

  reload() {
    console.log(this.props.state);
    axios.get(host.host + '/api/tarea/' + this.props.id, {
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
      if (this.state.newTarea === true) {
        this.setState({
          newTarea: !this.state.newTarea
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

  selectService = (serv) => {
    axios.get(host.host + "/api/tarea/find/" + serv.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        selectedService: []
      }, function() {
        this.setState({
          selectedService: res.data[0],
          tempObservacion: res.data[0].observaciones
        }, function() {
          console.log(this.state.selectedService);
          console.log(this.state.tempObservacion);
        })
      })
    })
  }

  changeReview(e) {
    this.setState({
      tempObservacion: e.target.value
    })
  }

  toggleNewTarea() {
    this.setState({
      newTarea: !this.state.newTarea
    })
  }

  updateObservacion() {
    var data = {
      observaciones: this.state.tempObservacion
    }
    axios.put(host.host + "/api/tarea/observacion/actualizar/" + this.state.selectedService.id, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.setState({
        tempObservacion: ""
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
              <th colspan="3">
                Servicios
                {this.props.state == 4 ?
                  <a style={{float: "right", cursor: "pointer"}} class="item" onClick={this.toggleNewTarea.bind(this)}>
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
                  <ServiceRow
                    data = {row}
                    color = {color}
                    deleteRow = {this.deleteRow}
                    tableColor = {this.props.color}
                    setPercent = {this.setPercent}
                    selectService = {this.selectService}
                    rol = {this.props.rol}
                    state = {this.props.state}
                  />
                )
              })}
              {this.state.newTarea ?
                <NewServiceRow
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
        {this.state.selectedService.length != 0 ?
          <TextareaAutosize style={{width: "100%", marginTop: "-16px"}} aria-label="empty textarea" placeholder="Observaciones" defaultValue={this.state.selectedService.observaciones} onChange={this.changeReview.bind(this)} />
          : null
        }
        {(this.state.tempObservacion != this.state.selectedService.observaciones) && this.state.selectedService.length != 0 ?
          <button onClick={this.updateObservacion.bind(this)}>Actualizar</button>
          : null
        }
      </div>
    )
  }

}
