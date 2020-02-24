import React, { Component } from 'react';

export default class Mensaje extends Component {

  render() {
    return(
      <div class="ui message">
        <i class="close icon" onClick={this.props.closeMessage}></i>
        <div class="header">
          {this.props.reason}
        </div>
        <p>{this.props.message}</p>
      </div>
    )
  }

}
