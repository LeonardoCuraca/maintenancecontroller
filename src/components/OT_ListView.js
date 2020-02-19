import React, { Component } from 'react';
import axios from 'axios';
import ReactToPrint from "react-to-print";
import NavBar from "./listComponents/NavBar";
import OT_ListTable from "./listComponents/OT_ListTable";
import Loader from "./animation/Loader";
import * as host from './host.js';

import "./css/OT_ListViewStyle.css";

export default class OT_ListView extends Component {
  constructor(props) {
    super(props);
    this.sidenav = React.createRef();
    this.toggleButton = React.createRef();
    this.printButton = React.createRef();
    this.state = {
      navOpen: false,
      isPopupOpen: false,
      TokenState: '',
      loader: true,
      rol_id: '',
      user_id: '',
    }
  }

  componentWillMount() {
    if (localStorage.getItem("token")){
      axios.get(host.host + '/api/users/', {
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
          })
        }
      })
    } else {
      this.setState({
        TokenState: 'UNAUTHORIZED'
      })
    }
  }

  onButtonClick = () => {
    this.setState({ isPopupOpen: true });
  };

  onCancelClick = () => {
    this.setState({ isPopupOpen: false });
  };

  toggleNav() {
    if (this.state.navOpen === true) {
      this.sidenav.current.style.width = "0";
      this.toggleButton.current.style.marginLeft = "0";
      this.printButton.current.style.right = "0";
    } else {
      this.sidenav.current.style.width = "250px";
      this.toggleButton.current.style.marginLeft = "250px";
      if(window.innerWidth <= 800) {
        this.printButton.current.style.right = "-250px";
      } else {
        this.printButton.current.style.right = "0";
      }
    }
    this.setState({
      navOpen: !this.state.navOpen,
    })
  }

  toggleLoader() {
    this.setState({
      loader: !this.state.loader
    })
  }

  render() {

    let content = (
      <div><Loader/></div>
    )

    if (this.state.TokenState == 'AUTHORIZED') {
      console.log(this.state.rol_id);
      content = (
        <div>
          {this.state.loader ?
            <Loader/>
            : null
          }
          <div ref={this.sidenav} className="sidenav">
            <NavBar
              rol_id={this.state.rol_id}
            />
          </div>
          <div className="main">
            <div style={{ marginBottom: "16px" }}>
              <a ref={this.toggleButton} className="toggleButton" onClick ={this.toggleNav.bind(this)}><i className="fas fa-bars"></i></a>
              <div ref={this.printButton} className="printButton" >
                <ReactToPrint
                  trigger={() => (
                    <a href="#" className="download-btn">
                      Imprimir Listado
                    </a>
                  )}
                  content={() => this.componentRef}
                />
              </div>
            </div>
            <div ref={el => (this.componentRef = el)}>
              <OT_ListTable
                rol_id={this.state.rol_id}
                user_id={this.state.user_id}
                toggleLoader={this.toggleLoader.bind(this)}
              />
            </div>
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
