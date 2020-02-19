import React, { Component } from 'react';
import NavBar from "./listComponents/NavBar";
import OT_DetailTable from "./listComponents/OT_DetailTable";

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
  render() {
    return (
      <div>
        <div ref={this.sidenav} className="sidenav">
          <NavBar/>
        </div>
        <div ref={this.main} className="main">
          <a className="toggleButton" onClick={this.toggleNav.bind(this)}><i className="fas fa-bars"></i></a>
          <div><OT_DetailTable id={this.props.match.params.id}/></div>
        </div>
      </div>
    );
  }
};
