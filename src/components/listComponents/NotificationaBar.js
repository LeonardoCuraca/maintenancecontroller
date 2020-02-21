import React, { Component } from 'react';
import axios from 'axios';

import "./style/NotificationStyle.css";

import * as host from '../host';

export default class Notification extends Component {

  render() {
    return(
      <div className="backContainer">
        <i className="notched circle loading icon"></i>
      </div>
    )
  }

}
