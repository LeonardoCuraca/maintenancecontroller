import React, { Component } from 'react';

import './TableLoaderStyle.css';

export default class TableLoader extends Component {
    render() {
      return(
        <div className="tableBack">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
}
