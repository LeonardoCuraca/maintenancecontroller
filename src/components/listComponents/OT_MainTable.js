import React, { Component } from 'react';
import axios from 'axios';
import history from "../../history";
import OT_MainRow from "./OT_MainRow";

export default class OT_Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  componentWillMount() {
    axios.get(this.props.url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data.data);

      if (res.data.data) {
        for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].id = this.pad(res.data.data[i].id, 6);
        }
        this.setState({
          data: res.data.data
        })
      }
    });
  }

  render() {
    return(
      <tbody>
        {this.state.data.map(row => {
          var state = "";
          var backgroundColor;
          var color;
          if (row.estado == 1) {
            backgroundColor = "#16a1b9ba";
          }
          if (row.estado == 2) {
            backgroundColor = "#dc3547ba";
          }
          if (row.estado == 3) {
            backgroundColor = "#29a643ba";
          }
          if (row.estado == 4) {
            backgroundColor = "#fec106ba";
          }
          if (row.estado == 5) {
            backgroundColor = "#ff5e00ba";
          }
          if (row.estado == 6) {
            backgroundColor = "#9d00ffba";
          }
          return(
            <OT_MainRow
              rowData = {row}
              backgroundColor = {backgroundColor}
            />
          )
        })}
      </tbody>
    )
  }
}
