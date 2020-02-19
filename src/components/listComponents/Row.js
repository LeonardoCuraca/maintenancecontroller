import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import "./style/Row.css";

export default class Row extends Component {

  render() {
    const { item, updateItem, removeItem } = this.props;
    return (
      <div class="container">
        <div class="row">
          <div class="col">col</div>
          <div class="col">col</div>
          <div class="col">col</div>
          <div class="col">col</div>
        </div>
        <div class="row">
          <div class="col-8">col-8</div>
          <div class="col-4">col-4</div>
        </div>
      </div>
    );
  }
}
