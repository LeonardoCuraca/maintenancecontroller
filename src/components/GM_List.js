import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import NavBar from "./listComponents/NavBar";
import GM_ListTable from "./listComponents/GM_ListTable";

import "./css/OT_ListViewStyle.css";

export default class GM_List extends Component {
  constructor(props) {
    super(props);
    this.sidenav = React.createRef();
    this.main = React.createRef();
    this.state = {
      navOpen: false,
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
    if (this.state.navOpen == true) {
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
  render() {
    return (
      <div>
        <div ref={this.sidenav} className="sidenav">
          <NavBar/>
        </div>
        <div ref={this.main} className="main">
          <a href="javascript:void(0)" className="closebtn" onClick ={this.toggleNav.bind(this)}><i className="fas fa-bars"></i></a>
          <div style={{ textAlign: "right", marginTop: "-32px", marginBottom: "16px" }}>
            <ReactToPrint
              trigger={() => (
                <a href="#" className="download-btn">
                  Imprimir Listado
                </a>
              )}
              content={() => this.componentRef}
            />
          </div>
          <div ref={el => (this.componentRef = el)}><GM_ListTable/></div>
        </div>
      </div>
    );
  }
};
