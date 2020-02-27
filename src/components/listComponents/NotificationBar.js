import React, { Component } from 'react';
import axios from 'axios';

import "./style/NotificationStyle.css";

import * as host from '../host';

export default class NotificationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    return(
      <div class="notificationContainer">
        <div class="notificationCard">
          <div class="ui icon message">
            <i class="inbox icon"></i>
            <div class="content">
              <div class="header">
                Have you heard about our mailing list?
              </div>
              <p>Get the best news in your e-mail every day.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
