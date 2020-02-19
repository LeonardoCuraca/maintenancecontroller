import React, { Component } from 'react';
import axios from 'axios';
import "./style/AsignPopup.css";

export default class AsignPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="popupBack">
        <div className="popupContent">
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
          <a className="nameCard"><div className="nameText">Jose Luis Camacho Suarez</div></a>
        </div>
      </div>
    )
  }

}
