import React, { Component } from 'react';
import axios from 'axios';

import "./style/NotificationStyle.css";

import * as host from '../host';

export default class NotificationBar extends Component {

  render() {
    return(
      <div class="ui cards" style={{width: "max-content"}}>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <div class="header">
              Elliot Fu
            </div>
            <div class="meta">
              Friends of Veronika
            </div>
            <div class="description">
              Elliot requested permission to view your contact details
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
