import React, { Component } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';

export default class OTReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      observaciones: this.props.review,
      textStyles: {border: "none", width: "100%", padding: "16px"},
      buttonStyles: {display: "none", border: "none", width: "100%", padding: "16px"}
    }
  }

  componentWillMount() {
    this.setState({
      observaciones: this.props.review
    })
  }

  changeReview(e) {
    this.setState({
      observaciones: e.target.value,
      buttonStyles: {border: "none", background: "#4eca6f8c", width: "100%", padding: "16px"}
    })
  }

  handleSubmit() {
    axios.put('http://192.168.43.100:8000/api/otes/observacion/actualizar/' + this.props.otid, this.state, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        buttonStyles: {display: "none", border: "none", background: "#fff", width: "100%", padding: "16px"}
      })
    })
  }

  render() {

    return(
      <div>
        <TextareaAutosize style={this.state.textStyles} aria-label="empty textarea" placeholder="Empty" defaultValue={this.props.review} onChange={this.changeReview.bind(this)} />
        <button style={this.state.buttonStyles} onClick={this.handleSubmit.bind(this)}>Actualizar</button>
      </div>
    )
  }

}
