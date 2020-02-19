import React, { Component } from 'react';

import './Loader.css';

export default class Loader extends Component {
    render() {
      return(
        <div className="back">
          <div className="loading">
            <span />
            <span />
            <span />
          </div>
        </div>
      )
    }
}
