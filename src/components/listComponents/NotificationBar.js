import React, { Component } from 'react';
import axios from 'axios';
import NotificationCard from "./NotificationCard";

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
    this.setState({
      notifications: []
    }, function() {
      axios.get(host.host + '/api/irregularidades/pendientes').then(res => {
        this.setState({
          notifications: res.data
        })
      })
    })
  }

  render() {
    return(
      <div class="notificationContainer">
        {this.state.notifications.map(notification => {
          return(
            <NotificationCard
              notification = {notification}
              reload = {this.componentWillMount.bind(this)}
            />
          )
        })}
      </div>
    )
  }

}
