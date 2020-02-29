import React, { Component } from 'react';
import axios from 'axios';

import "./style/NotificationStyle.css";

import * as host from '../host';

export default class NotificationCard extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  archive() {
    axios.put(host.host + '/api/irregularidades/archivar/' + this.props.notification.id).then(res => {
      console.log(res);
      this.props.reload();
    })
  }

  render() {
    return(
      <div class="notificationCard">
        <div class="ui icon message">
          <i class="archive exclamation icon" onClick={this.archive.bind(this)}></i>
          <div class="content">
            <div class="header">
              {this.props.notification.mensaje}
            </div>
            <p>Placa: {this.props.notification.placa}</p>
          </div>
        </div>
      </div>
    )
  }

}
