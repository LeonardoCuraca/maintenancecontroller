import React, { Component } from 'react';
import axios from 'axios';
import history from "../../history";
import OT_MainRow from "./OT_MainRow";
import OT_MainTable from "./OT_MainTable";
import * as host from '../host.js';

import { Dropdown } from 'semantic-ui-react'

import "./style/OT_MainStyle.css";

export default class OT_Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      pages: [],
      selectedArea: 0,
      selectedState: 0,
      estructuras: 0,
      aceite: 0,
      neumaticos: 0,
      pesada: 0,
      liviana: 0,
      gas: 0,
      frios: 0,
      url: host.host + "/api/otes/paginacion/general/10?page=1",
      color1: "",
      color2: "",
      color3: "",
      color4: "",
      color5: "",
      color6: "",
      areacolor1: "",
      areacolor2: "",
      areacolor3: "",
      areacolor4: "",
      areacolor5: "",
      areacolor6: "",
      areacolor7: "",
      placa: "",
      empresa: "",
      correlativo: ""
    }
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  componentWillMount() {
    let pages = [];
    var pg = 0;
    axios.get(host.host + "/api/otes/count/general", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      for (let i = 1; i <= Math.trunc((res.data / 10) + 1); i++) {
        pages.push(i);
      }
      this.setState({
        pages: pages
      })
    })

    axios.get(host.host + "/api/otes/area/count/1", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        estructuras: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/2", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        aceite: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/3", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        neumaticos: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/4", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        pesada: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/5", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        liviana: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/6", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        gas: res.data
      })
    })
    axios.get(host.host + "/api/otes/area/count/7", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      this.setState({
        frios: res.data
      })
    })
  }

  back() {
    if (this.state.page == 1) {
      console.log("no pages back");
      return
    }
    this.setState({
      page: this.state.page - 1,
      url: ""
    }, function(){
      console.log(this.state.page);
      this.setState({
        url: host.host + "/api/otes/paginacion/general/10?page=" + this.state.page
      })
    })
  }

  next() {
    if (this.state.page == this.state.pages.length) {
      console.log("no pages next");
      return
    }
    this.setState({
      page: this.state.page + 1,
      url: ""
    }, function(){
      console.log(this.state.page);
      this.setState({
        url: host.host + "/api/otes/paginacion/general/10?page=" + this.state.page
      })
    })
  }

  selectPage(page) {
    console.log(page);
    this.setState({
      page: page,
      url: ""
    }, function() {
      this.setState({
        url: host.host + "/api/otes/paginacion/general/10?page=" + this.state.page
      })
    })
  }

  selectArea(area) {
    if (area == 1) {
      this.setState({
        areacolor1: "#dcdcdc",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "",
        areacolor7: ""
      })
    }
    if (area == 2) {
      this.setState({
        areacolor1: "",
        areacolor2: "#dcdcdc",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "",
        areacolor7: ""
      })
    }
    if (area == 3) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "#dcdcdc",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "",
        areacolor7: ""
      })
    }
    if (area == 4) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "#dcdcdc",
        areacolor5: "",
        areacolor6: "",
        areacolor7: ""
      })
    }
    if (area == 5) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "#dcdcdc",
        areacolor6: "",
        areacolor7: ""
      })
    }
    if (area == 6) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "#dcdcdc",
        areacolor7: ""
      })
    }
    if (area == 7) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "",
        areacolor7: "#dcdcdc"
      })
    }
    if (area == this.state.selectedArea) {
      this.setState({
        areacolor1: "",
        areacolor2: "",
        areacolor3: "",
        areacolor4: "",
        areacolor5: "",
        areacolor6: "",
        areacolor7: ""
      })
      console.log(area);
      this.setState({
        url: ""
      }, function() {
        if (this.state.selectedState != 0) {
          this.setState({
            page: 1,
            selectedArea: 0,
            url: host.host + "/api/otes/estado/general/" + this.state.selectedState
          })
        } else {
          this.setState({
            page: 1,
            selectedArea: 0,
            url: host.host + "/api/otes/paginacion/general/10?page=1"
          })
        }
      })
      return
    }
    this.setState({
      selectedArea: area,
      url: ""
    }, function() {
      if (this.state.selectedState != 0) {
        this.setState({
          url: host.host + "/api/otes/area/general/" + area + "/" + this.state.selectedState
        })
      } else {
        this.setState({
          url: host.host + "/api/otes/area/" + area
        })
      }
    })
  }

  selectState(state) {
    if (state == 0) {
      this.setState({
        color1: "0.8",
        color2: "",
        color3: "",
        color4: "",
        color5: "",
        color6: ""
      })
    }
    if (state == 1) {
      this.setState({
        color1: "",
        color2: "0.8",
        color3: "",
        color4: "",
        color5: "",
        color6: ""
      })
    }
    if (state == 2) {
      this.setState({
        color1: "",
        color2: "",
        color3: "0.8",
        color4: "",
        color5: "",
        color6: ""
      })
    }
    if (state == 3) {
      this.setState({
        color1: "",
        color2: "",
        color3: "",
        color4: "0.8",
        color5: "",
        color6: ""
      })
    }
    if (state == 4) {
      this.setState({
        color1: "",
        color2: "",
        color3: "",
        color4: "",
        color5: "0.8",
        color6: ""
      })
    }
    if (state == 5) {
      this.setState({
        color1: "",
        color2: "",
        color3: "",
        color4: "",
        color5: "",
        color6: "0.8",
      })
    }
    if (state == this.state.selectedState) {
      this.setState({
        color1: "",
        color2: "",
        color3: "",
        color4: "",
        color5: "",
        color6: "",
        url: ""
      }, function() {
        if (this.state.selectedArea != 0) {
          this.setState({
            page: 1,
            selectedState: 0,
            url: host.host + "/api/otes/area/" + this.state.selectedArea
          })
        } else {
          this.setState({
            page: 1,
            selectedState: 0,
            url: host.host + "/api/otes/paginacion/general/10?page=1"
          })
        }
      })
      return
    }
    this.setState({
      selectedState: state,
      url: ""
    }, function() {
      if (this.state.selectedArea != 0) {
        this.setState({
          url: host.host + "/api/otes/area/general/" + this.state.selectedArea + "/" + state
        })
      } else {
        this.setState({
          url: host.host + "/api/otes/estado/general/" + state
        })
      }
    }, function() {
      console.log(this.state.url);
    })
  }

  changePlaca(e) {
    this.setState({
      placa: e.target.value
    })
  }

  findByPlaca() {
    this.setState({
      selectedArea: 0,
      selectedState: 0,
      correlativo: "",
      url: ""
    }, function() {
      this.setState({
        url: host.host + "/api/otes/vehiculo/" + this.state.placa
      })
    })
  }

  changeCorrelativo(e) {
    this.setState({
      correlativo: e.target.value
    })
  }

  findByCorrelativo() {
    this.setState({
      selectedArea: 0,
      selectedState: 0,
      placa: "",
      url: ""
    }, function() {
      this.setState({
        url: host.host + "/api/otes/correlativo/" + this.state.correlativo
      })
    })
  }

  changeEmpresa(e) {
    console.log(e.target.value);
    console.log("hi");
  }

  findByEmpresa() {

  }

  render() {
    return(
      <div>

        <div class="ui compact menu">
          <a style={{background: this.state.areacolor1}} class="item" onClick={this.selectArea.bind(this, 1)}>
            <i class="icon mail"></i> Estructuras
            <div class="floating ui red label">{this.state.estructuras}</div>
          </a>
          <a style={{background: this.state.areacolor2}} class="item" onClick={this.selectArea.bind(this, 2)}>
            <i class="icon users"></i> Aceite
            <div class="floating ui orange label">{this.state.aceite}</div>
          </a>
          <a style={{background: this.state.areacolor3}} class="item" onClick={this.selectArea.bind(this, 3)}>
            <i class="icon mail"></i> Neumáticos
            <div class="floating ui yellow label">{this.state.neumaticos}</div>
          </a>
          <a style={{background: this.state.areacolor4}} class="item" onClick={this.selectArea.bind(this, 4)}>
            <i class="icon users"></i> Pesada
            <div class="floating ui green label">{this.state.pesada}</div>
          </a>
          <a style={{background: this.state.areacolor5}} class="item" onClick={this.selectArea.bind(this, 5)}>
            <i class="icon mail"></i> Liviana
            <div class="floating ui teal label">{this.state.liviana}</div>
          </a>
          <a style={{background: this.state.areacolor6}} class="item" onClick={this.selectArea.bind(this, 6)}>
            <i class="icon users"></i> Gas
            <div class="floating ui blue label">{this.state.gas}</div>
          </a>
          <a style={{background: this.state.areacolor7}} class="item" onClick={this.selectArea.bind(this, 7)}>
            <i class="icon mail"></i> Frios
            <div class="floating ui purple label">{this.state.frios}</div>
          </a>
        </div>

        <ul className="stateList">
          <button style={{opacity: this.state.color1}} onClick={this.selectState.bind(this, 0)}>Historial</button>
          <button style={{opacity: this.state.color2}} onClick={this.selectState.bind(this, 1)}>Entrantes</button>
          <button style={{opacity: this.state.color3}} onClick={this.selectState.bind(this, 2)}>En Revisión</button>
          <button style={{opacity: this.state.color4}} onClick={this.selectState.bind(this, 3)}>En Espera de Materiales</button>
          <button style={{opacity: this.state.color5}} onClick={this.selectState.bind(this, 4)}>En Proceso</button>
          <button style={{opacity: this.state.color6}} onClick={this.selectState.bind(this, 5)}>Finalizados</button>
        </ul>

        <input value={this.state.placa} placeholder="Placa" onChange={this.changePlaca.bind(this)}/>
        <button class="ui grey button" onClick={this.findByPlaca.bind(this)}>Buscar</button>

        <input value={this.state.correlativo} placeholder="Correlativo" onChange={this.changeCorrelativo.bind(this)}/>
        <button class="ui grey button" onClick={this.findByCorrelativo.bind(this)}>Buscar</button>

        <h4 class="ui horizontal divider header" style={{marginTop: "16px", marginBottom: "16px"}}>
          <i class="list icon"></i>
          Listado de Órdenes de Trabajo
        </h4>

          <table class="ui single line compact table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha Inicio</th>
                <th>Hora Inicio</th>
                <th>Vehículo</th>
                <th>Tipo de Vehículo</th>
                <th>Acoplado</th>
                <th>Operación</th>
                <th>Área</th>
                <th>Conductor</th>
                <th>DNI</th>
                <th>Estado</th>
              </tr>
            </thead>
            {this.state.url ?
              <OT_MainTable
                url = {this.state.url}
              />
              : null
            }
            <tfoot>
              <tr>
                <th colspan="13">
                  <div className="ui pagination menu" style={{width: "33.33%", marginLeft: "33.33%", marginRight: "33.33%"}}>
                    <a className="icon item" onClick={this.back.bind(this)} style={{width: "14.2857143%"}}>
                      <i className="left chevron icon"></i>
                    </a>
                    {this.state.pages.map(page => {
                      if (page < this.state.page - 2 || page > this.state.page + 2) {
                        if (((this.state.page == 1 && page == 4) || (this.state.page == 1 && page == 5)) || ((this.state.page == 2 && page == 5) || (this.state.page == 2 && page == 4)) || ((this.state.page == this.state.pages.length - 1 && page == this.state.pages.length - 3) || (this.state.page == this.state.pages.length - 1 && page == this.state.pages.length - 4)) || ((this.state.page == this.state.pages.length && page == this.state.pages.length - 3) || (this.state.page == this.state.pages.length && page == this.state.pages.length - 4))) {
                          console.log("pass");
                        } else {
                          return
                        }
                      }
                      var color = "";
                      if (page == this.state.page) {
                        color = "#f3f5f9"
                      }
                      return(
                        <a className="item" onClick={this.selectPage.bind(this, page)} style={{width: "14.2857143%", justifyContent: "center", backgroundColor: color}}>{page}</a>
                      )
                    })}
                    <a className="icon item" onClick={this.next.bind(this)} style={{width: "14.2857143%"}}>
                      <i className="right chevron icon"></i>
                    </a>
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
      </div>
    )
  }
}
