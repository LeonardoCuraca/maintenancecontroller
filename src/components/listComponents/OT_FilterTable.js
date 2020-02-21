import React, { Component } from 'react';
import axios from 'axios';
import TableLoader from "../animation/TableLoader";
import OT_FilterRow from "./OT_FilterRow";
import OT_RequirementsTable from "./OT_RequirementsTable";
import NewOTModal from "./NewOTModal";
import DateHourModal from "./DateHourModal";
import MaterialModal from "./MaterialModal";
import EmployeeTable from "./EmployeeTable";
import ServiceTable from "./ServiceTable";
import OT_MaterialTable from "./OT_MaterialTable";
import AsignMaterialModal from "./AsignMaterialModal";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import "./style/OT_FilterTableStyle.css";
import * as host from '../host.js';

export default class OT_FilterTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      data: [],
      loader: true,
      id: 0,
      clicked: 0,
      content: <div>hello</div>,
      selectedRowData: [],
      isDateHourOpen: false,
      isPopupOpen: false,
      asignPopupOpen: false,
      materialOpen: false,
      solicitud: [],
      materialList: false,
      serviceList: false,
      observacion: "",
    }
    this.change = this.change.bind(this);
  }

  componentWillMount() {
    console.log(this.props.state);
    axios.get(host.host + '/api/otes/area/general/' + this.props.area + "/" + this.props.state, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        data: res.data.data,
        loader: false
      })
    });
  }

  reload() {
    axios.get(host.host + '/api/otes/area/general/' + this.props.area + "/" + this.props.state, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        data: [],
        loader: false
      }, function() {
        this.setState({
          data: res.data.data
        }, function() {
          console.log(this.state.clicked);
          if (this.state.clicked != 0) {
            console.log("different -> " + res.data.data.length);
            for (var i = 0; i < res.data.data.length; i++) {
              if (this.state.clicked == res.data.data[i].id) {
                console.log(res.data.data[i]);
                this.setState({
                  selectedRowData: res.data.data[i]
                })
              }
            }
          }
        })
      })
    });
  }

  change(row) {

    axios.get(host.host + '/api/solicitud/ote/' + row.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        solicitud: res.data[0]
      })
    });

    this.setState({
      content: null,
      selectedRowData: row
    },
      function() {
        this.setState({
          observacion: this.state.selectedRowData.observaciones
        })
        if (row.id == this.state.clicked) {
          this.setState({
            clicked: 0
          })
          return
        }
        if (this.props.state == 3) {
          this.setState({
            content: <OT_MaterialTable ot = {row.id} reload = {this.reload.bind(this)} rol = {this.props.rol}/>,
            clicked: row.id
          })
        } else {
          this.setState({
            content: <OT_RequirementsTable id = {row.id} color = {this.state.color} reload = {this.reload.bind(this)} rol = {this.props.rol} state = {this.props.state}/>,
            clicked: row.id
          })
        }
      }
    )
  }

  onButtonClick = () => {
    this.setState({ isPopupOpen: true });
  };

  onCancelClick = () => {
    this.setState({ isPopupOpen: false });
  };

  onDateHourOpen = () => {
    console.log("open");
    this.setState({ isDateHourOpen: true });
  };

  onCancelDateHourClick = () => {
    this.setState({ isDateHourOpen: false });
    this.reload();
  };

  materialOpen = () => {
    this.setState({ materialOpen: true })
  }

  materialClose = () => {
    this.setState({ materialOpen: false })
    this.reload();
  }

  showMaterialList = () => {
    this.setState({
      materialList: true
    })
  }

  asignClose = () => {
    this.setState({
      materialList: false
    })
  }

  showEmployeeList() {
    if (this.state.serviceList) {
      this.setState({
        serviceList: false
      })
    }
    this.setState({
      employeeList: !this.state.employeeList
    })
  }

  toggleSeviceList() {
    if (this.state.employeeList) {
      this.setState({
        employeeList: false
      })
    }
    this.setState({
      serviceList: !this.state.serviceList
    })
  }

  revision() {
    let estado = {
      estado: 5
    }
    axios.put(host.host + '/api/otes/estado/actualizar/' + this.state.selectedRowData.id, estado, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      window.location.reload();
    })
  }

  darAlta() {
    let estado = {
      estado: 6
    }
    axios.put(host.host + '/api/otes/estado/actualizar/' + this.state.selectedRowData.id, estado, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      axios.put(host.host + "/api/otes/fecha/hora/fin/real/" + this.state.selectedRowData.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        window.location.reload();
      })
    })
  }

  regresarProceso() {
    let estado = {
      estado: 4
    }
    axios.put(host.host + '/api/otes/estado/actualizar/' + this.state.selectedRowData.id, estado, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      window.location.reload();
    })
  }

  changeReview(e) {
    this.setState({
      observacion: e.target.value
    })
  }

  updateObservacion() {
    var data = {
      observaciones: this.state.observacion
    }
    axios.put(host.host + "/api/otes/observacion/actualizar/" + this.state.selectedRowData.id, data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.reload();
    })
  }

  start() {
    axios.put(host.host + "/api/otes/fecha/hora/inicio/real/" + this.state.selectedRowData.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.reload();
    })
  }

  render() {
    return(
      <div  style={{width: "100%", marginTop: "16px"}}>
        {this.state.loader ?
          <TableLoader/>
          : null
        }
        {this.props.state == 1 && this.props.rol== 5 ?
          <div>
            <button className="createOTButton" onClick={this.onButtonClick}>Crear Nueva OT</button>
          </div>
          : null
        }
        <NewOTModal
          id={this.props.id}
          isPopupOpen={this.state.isPopupOpen}
          onCancelClick={this.onCancelClick}
          reload = {this.reload.bind(this)}
          area = {this.props.area}
        />
        {this.state.materialOpen ?
          <MaterialModal
            ot = {this.state.selectedRowData.id}
            isPopupOpen={this.state.materialOpen}
            onCancelClick={this.materialClose}
          />
          : null
        }
        {this.state.materialList ?
          <AsignMaterialModal
            ot = {this.state.selectedRowData.id}
            solicitud={this.state.solicitud}
            isPopupOpen={this.state.materialList}
            asignClose={this.asignClose}
          />
          : null
        }
        {this.state.isDateHourOpen ?
          <DateHourModal
            ot = {this.state.selectedRowData.id}
            isPopupOpen={this.state.isDateHourOpen}
            onCancelDateHourClick={this.onCancelDateHourClick}
            data = {this.state.selectedRowData}
          />
          : null
        }
        <table style={{borderTop: ".2em solid " + this.state.color}} className="ui table">
          <thead className="">
            <tr className="">
              <th className="">N° OT</th>
              <th className="">Placa de Vehículo</th>
              <th className="">Tipo de Vehículo</th>
              <th className="">Operación</th>
              <th className="">Progreso</th>
              {this.props.state == 1 ?
                <th>Fecha Entrante</th>
                : null
              }
              {this.props.state == 1 ?
                <th>Hora Entrante</th>
                : null
              }
            </tr>
          </thead>
          <tbody className="">
            {this.state.data.map(row => {
              return(
                <OT_FilterRow
                  color = {this.state.color}
                  data = {row}
                  showInfo = {this.change.bind(this, row)}
                  state = {this.props.state}
                  rol = {this.props.rol}
                />
              )
            })}
          </tbody>
        </table>
        {this.state.clicked ?
          <div style={{display: "flex"}}>
            {this.state.employeeList ?
              <div style={{width: "50%", marginRight: "4px"}}>
                <EmployeeTable
                  ot = {this.state.selectedRowData.id}
                  area = {this.props.area}
                />
              </div>
              : null
            }
            {this.state.serviceList ?
              <div style={{width: "50%", marginRight: "4px"}}>
                <ServiceTable
                  id = {this.state.selectedRowData.id}
                  area = {this.props.area}
                  color = {this.state.color}
                  reload = {this.reload.bind(this)}
                  rol = {this.props.rol}
                  state = {this.props.state}
                />
              </div>
              : null
            }
            {!this.state.employeeList && !this.state.serviceList ?
              <div style={{width: "50%", marginRight: "4px"}}>
                {this.state.content}
              </div>
              : null
            }
            <div style={{width: "50%"}}>
              <div class="ui segment" style={{marginLeft: "4px", marginTop: 0}}>
                <h4 class="ui horizontal divider header">
                  Detalles
                </h4>
                <p>Conductor: {this.state.selectedRowData.conductor}</p>
                <p>DNI: {this.state.selectedRowData.dni}</p>
                {this.state.selectedRowData.acoplado ?
                  <p>Acoplado: {this.state.selectedRowData.acoplado}</p>
                  : null
                }
                {this.props.state == 1 ?
                  <p>Fecha Entrada: {this.state.selectedRowData.f_programada_inicio} {this.state.selectedRowData.h_programada_inicio}</p>
                  :
                  <p>Fecha Entrada: {this.state.selectedRowData.f_inicio_real} {this.state.selectedRowData.h_inicio_real}</p>
                }
                {this.props.state == 1 ?
                  <p>Fecha Salida: {this.state.selectedRowData.f_programada_fin} {this.state.selectedRowData.h_programada_fin}</p>
                  :
                  <p>Fecha Salida: {this.state.selectedRowData.f_fin_real} {this.state.selectedRowData.h_fin_real}</p>
                }
                {this.state.serviceList ?
                  <div className="progressContent">
                    {this.state.selectedRowData.progreso_tareas != 0 ?
                      <div className="progressBar" style={{background: this.state.color ,top: 100 - this.state.selectedRowData.progreso_tareas + "%", width: this.state.selectedRowData.progreso_tareas + "%"}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{Math.round(this.state.selectedRowData.progreso_tareas)}%</div>
                      : null
                    }
                  </div>
                  :
                  <div className="progressContent">
                    {this.state.selectedRowData.aprobadas != 0 ?
                      <div className="progressBar" style={{background: this.state.color ,top: 100 - this.state.selectedRowData.aprobadas + "%", width: this.state.selectedRowData.aprobadas + "%"}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">{Math.round(this.state.selectedRowData.aprobadas)}%</div>
                      : null
                    }
                  </div>
                }
                <h4 class="ui horizontal divider header">
                  Observaciones
                </h4>
                <TextareaAutosize style={{width: "100%"}} aria-label="empty textarea" placeholder="Observaciones" value={this.state.observacion} onChange={this.changeReview.bind(this)} />
                {this.state.observacion != this.state.selectedRowData.observaciones ?
                  <button onClick={this.updateObservacion.bind(this)}>Actualizar</button>
                  : null
                }
              </div>
              <div style={{display: "inline-grid"}}>
                {(this.props.rol == 3 || this.props.rol == 5) && (this.props.state == 1 || this.props.state == 2 || this.props.state == 4)?
                  <div style={{display: "inline-grid"}}>
                    <button class="ui button" style={{background: "#16a1b9", color: "#fff", marginTop: "4px", marginBottom: "4px"}} onClick={this.onDateHourOpen}>Programar Fechas</button>
                  </div>
                  : null
                }
                {(this.props.rol == 3 || this.props.rol == 5) && this.props.state == 1 ?
                  <button class="ui red button" onClick={this.showEmployeeList.bind(this)} style={{marginTop: "4px", marginBottom: "4px"}}>Asignar Trabajadores</button>
                  : null
                }
                {this.props.state == 4 && this.props.rol == 5 ?
                  <div style={{display: "inline-grid"}}>
                    <button class="ui red button" onClick={this.toggleSeviceList.bind(this)} style={{marginTop: "4px", marginBottom: "4px"}}>Servicio a Realizar</button>
                    <button class="ui button" style={{background: "#ff5e00", color: "#fff", marginTop: "4px", marginBottom: "4px"}} onClick={this.revision.bind(this)}>Enviar a Revisión</button>
                  </div>
                  : null
                }
                {this.props.state == 5 && this.props.rol == 5 ?
                  <div style={{display: "inline-grid"}}>
                    <button class="ui button" style={{background: "#9d00ff", color: "#fff", marginTop: "4px", marginBottom: "4px"}} onClick={this.darAlta.bind(this)}>Dar de Alta</button>
                    <button class="ui button" style={{background: "#fec106", color: "#fff", marginTop: "4px", marginBottom: "4px"}} onClick={this.regresarProceso.bind(this)}>Regresar a Mantenimiento</button>
                  </div>
                  : null
                }
                {(this.state.solicitud && (this.props.rol == 3 || this.props.rol == 5)) & (this.props.state == 4 || this.props.state == 2)?
                  <button class="ui green button" onClick={this.showMaterialList.bind(this)} style={{marginTop: "4px", marginBottom: "4px"}}>Listar Materiales</button>
                  :
                  <div>
                    {(this.props.state == 2 && this.props.rol == 5) || (this.props.state == 2 && this.props.rol == 3) ?
                      <div style={{display: "inline-grid"}}>
                        <button class="ui green button" onClick={this.materialOpen} style={{marginTop: "4px", marginBottom: "4px"}}>Solicitar Materiales</button>
                        {!this.state.selectedRowData.f_inicio_real ?
                          <button class="ui red button" onClick={this.start.bind(this)} style={{marginTop: "4px", marginBottom: "4px"}}>Iniciar Mantenimiento</button>
                          : null
                        }
                      </div>
                      : null
                    }
                  </div>
                }
              </div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }

}
