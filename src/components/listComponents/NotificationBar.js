import React, { Component } from 'react';
import axios from 'axios';

import "./style/NotificationStyle.css";

import * as host from '../host';

export default class NotificationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }

  componentWillMount() {
    axios.get(host.host + '/api/irregularidades').then(res => {
      this.setState({
        notifications: res.data.data
      })
    })
  }

  render() {
    return(
      <div class="notificationContainer">
        {this.state.notifications.map(notification => {
          return(
            <div class="notificationCard">
              <div class="ui icon message">
                <i class="exclamation icon"></i>
                <div class="content">
                  <div class="header">
                    {notification.mensaje}
                  </div>
                  <p>Placa: {notification.placa}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}
