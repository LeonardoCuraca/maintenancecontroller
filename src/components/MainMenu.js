import React, { Component } from 'react';
import axios from 'axios';
import NavBar from "./listComponents/NavBar";
import OT_FilterTable from "./listComponents/OT_FilterTable";
import MainCards from "./listComponents/MainCards";
import Loader from "./animation/Loader";
import OT_Main from "./listComponents/OT_Main";
import AdminUsersView from "./listComponents/AdminUsersView";
import AdminEmployeesView from "./listComponents/AdminEmployeesView";
import AdminAreaView from "./listComponents/AdminAreaView";
import LubricantesTable from "./listComponents/LubricantesTable";
import * as host from './host.js';

import "./style/MainMenu.css";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.sidenav = React.createRef();
    this.main = React.createRef();
    this.state = {
      navOpen: false,
      blueTable: false,
      redTable: false,
      greenTable: false,
      yellowTable: false,
      orangeTable: false,
      purpleTable: false,
      area: -1,
      rol_id: 0
    }
  }

  componentWillMount() {
    if (localStorage.getItem("token")){
      axios.get(host.host + '/api/auth/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.error) {
          console.log(res);
          console.log("error");
          if (res.data.error == 'TOKEN_EXPIRED') {
            console.log("expired");
            this.setState({
              TokenState: 'TOKEN_EXPIRED'
            })
          }
        } else {
          console.log('AUTHORIZED');
          this.setState({
            TokenState: 'AUTHORIZED',
            rol_id: res.data.rol_id,
            user_id: res.data.id
          }, function() {
            console.log(res.data.rol_id);
            if (res.data.rol_id == 3) {
              axios.get(host.host + "/api/area/encargado/" + res.data.id, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem("token")
                }
              }).then(res => {
                this.setState({
                  area: res.data[0].id
                })
              })
            } else {
              this.setState({
                area: 0
              })
            }
          })
        }
      })
    } else {
      this.setState({
        TokenState: 'UNAUTHORIZED'
      })
    }
  }

  openNav() {
    console.log("open");
    this.sidenav.current.style.width = "250px";
    this.main.current.style.marginLeft = "250px";
  }
  closeNav() {
    console.log("close");
    this.sidenav.current.style.width = "0";
    this.main.current.style.marginLeft = "0";
  }
  toggleNav() {
    if (this.state.navOpen === true) {
      this.sidenav.current.style.width = "0";
      this.main.current.style.marginLeft = "0";
    } else {
      this.sidenav.current.style.width = "250px";
      this.main.current.style.marginLeft = "250px";
    }
    this.setState({
      navOpen: !this.state.navOpen,
    })
  }

  showBlue() {
    this.setState({
      state: 1,
      blueTable: true,
      redTable: false,
      greenTable: false,
      yellowTable: false,
      orangeTable: false,
      purpleTable: false
    })
  }

  showRed() {
    this.setState({
      state: 2,
      blueTable: false,
      redTable: true,
      greenTable: false,
      yellowTable: false,
      orangeTable: false,
      purpleTable: false,
    })
  }

  showGreen() {
    this.setState({
      state: 3,
      blueTable: false,
      redTable: false,
      greenTable: true,
      yellowTable: false,
      orangeTable: false,
      purpleTable: false,
    })
  }

  showYellow() {
    this.setState({
      state: 4,
      blueTable: false,
      redTable: false,
      greenTable: false,
      yellowTable: true,
      orangeTable: false,
      purpleTable: false,
    })
  }

  showOrange() {
    this.setState({
      state: 5,
      blueTable: false,
      redTable: false,
      greenTable: false,
      yellowTable: false,
      orangeTable: true,
      purpleTable: false,
    })
  }

  showPurple() {
    this.setState({
      state: 6,
      blueTable: false,
      redTable: false,
      greenTable: false,
      yellowTable: false,
      orangeTable: false,
      purpleTable: true,
    })
  }

  selectArea = (area) => {
    console.log(area);
    this.setState({
      area: area,
      blueTable: false,
      redTable: false,
      greenTable: false,
      yellowTable: false,
      orangeTable: false,
      purpleTable: false,
    })
  }

  render() {
    let content = (
      <div><Loader/></div>
    )

    if (this.state.TokenState == 'AUTHORIZED') {
      console.log("rol:" + this.state.rol_id);
      content = (
        <div>
          {this.state.loader ?
            <Loader/>
            : null
          }
          <div style={{background: "#f3f5f9"}} ref={this.sidenav} className="sidenav">
            <NavBar
              rol_id = {this.state.rol_id}
              area = {this.state.area}
              selectArea = {this.selectArea}
            />
          </div>
          <div style={{background: "#f3f5f9"}} ref={this.main} className="main">
            <div style={{display: "flex"}}>
              <a className="navButton" onClick={this.toggleNav.bind(this)}><i className="list icon"></i></a>
              <div style={{fontSize: "36px", fontWeight: "500", marginLeft: "16px"}}>
              {this.state.area == 1 ?
                "Area de Estructuras"
                : null
              }
              {this.state.area == 2 ?
                "Area de Lavado y Cambio de Aceite"
                : null
              }
              {this.state.area == 3 ?
                "Area de Neumáticos"
                : null
              }
              {this.state.area == 4 ?
                "Area de Mantenimiento Pesado"
                : null
              }
              {this.state.area == 5 ?
                "Area de Mantenimiento Liviano"
                : null
              }
              {this.state.area == 6 ?
                "Area de Mantenimiento de Gas"
                : null
              }
              {this.state.area == 7 ?
                "Area de Fríos"
                : null
              }
              </div>
            </div>
            {this.state.area > 0 && this.state.area != 9 && this.state.area != 8 && this.state.area != 10 ?
              <div className="content">
                <div className="cardsCol">
                  <div className="cardsContainer">
                    <MainCards
                      showBlue = {this.showBlue.bind(this)}
                      showRed = {this.showRed.bind(this)}
                      showGreen = {this.showGreen.bind(this)}
                      showYellow = {this.showYellow.bind(this)}
                      showOrange = {this.showOrange.bind(this)}
                      showPurple = {this.showPurple.bind(this)}
                      rol = {this.state.rol_id}
                    />
                  </div>
                </div>
                <div className="tableCol">
                  {this.state.blueTable ?
                    <OT_FilterTable
                      color = "#16a1b9"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                  {this.state.redTable ?
                    <OT_FilterTable
                      color = "#dc3547"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                  {this.state.greenTable ?
                    <OT_FilterTable
                      color = "#29a643"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                  {this.state.yellowTable ?
                    <OT_FilterTable
                      color = "#fec106"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                  {this.state.orangeTable ?
                    <OT_FilterTable
                      color = "#ff5e00"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                  {this.state.purpleTable ?
                    <OT_FilterTable
                      color = "#9d00ff"
                      area = {this.state.area}
                      state = {this.state.state}
                      rol = {this.state.rol_id}
                    />
                    : null
                  }
                </div>
              </div>
              :
              <div>
                {this.state.area == 0 ?
                  <OT_Main />
                  :
                  <div>
                    {this.state.area == 8 ?
                      <AdminUsersView />
                      : null
                    }
                    {this.state.area == 9 ?
                      <AdminEmployeesView />
                      : null
                    }
                    {this.state.area == 10 ?
                      <AdminAreaView />
                      : null
                    }
                    {this.state.area < 0 ?
                      <div>
                        {this.state.area == -2 && this.state.area < 0 ?
                          <LubricantesTable />
                          :
                          <div>Proximamente</div>
                        }
                      </div>
                      : null
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      )
    }

    if (this.state.TokenState == 'TOKEN_EXPIRED') {
      content = (
        <div>Sesión Expirada</div>
      )
    }

    if (this.state.TokenState == 'UNAUTHORIZED') {
      content = (
        <div>Debe Iniciar Sesión</div>
      )
    }

    return (
      <div>{content}</div>
    );
  }
};
