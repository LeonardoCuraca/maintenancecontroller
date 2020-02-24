import React, { Component } from "react";
import axios from 'axios';
import Notification from "./Notification";
import * as host from '../host';

import {
  Button,
  Modal,
  Row,
  Col,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardFooter,
  Form,
  FormText
} from "reactstrap";

export default class DateHourModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_programada_inicio: "",
      h_programada_inicio: "",
      f_programada_fin: "",
      h_programada_fin: "",
      loader: false
    }
  }

  changeFIngreso(e) {
    this.setState({
      f_programada_inicio: e.target.value
    })
  }

  changeHIngreso(e) {
    this.setState({
      h_programada_inicio: e.target.value
    })
  }

  changeFSalida(e) {
    this.setState({
      f_programada_fin: e.target.value
    })
  }


  changeHSalida(e) {
    this.setState({
      h_programada_fin: e.target.value
    })
  }

  componentWillMount() {
    console.log(this.props.data);
    this.setState({
      f_programada_inicio: this.props.data.f_programada_inicio,
      h_programada_inicio: this.props.data.h_programada_inicio,
      f_programada_fin: this.props.data.f_programada_fin,
      h_programada_fin: this.props.data.h_programada_fin
    })
  }

  handleSubmit() {
    this.setState({
      loader: true
    })
    console.log(this.state);
    axios.put(host.host + '/api/otes/fecha/hora/programables/' + this.props.ot, this.state, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.setState({
        loader: false
      })
      this.props.onCancelDateHourClick();
    })
  }

  render() {
    return (
      <Modal
        className="modal-dialog modal-ms"
        isOpen={this.props.isPopupOpen}
        onRequestClose={this.props.onCancelClick}
        contentLabel="Cancelled / Not Required"
        className="my-modal"
        style={{ maxWidth: "75%" }}
      >
        {this.state.loader ?
          <Notification/>
          : null
        }
        <ModalHeader style={{ backgroundColor: "#16a1b9", color: "#fff" }}>Programación</ModalHeader>
        <ModalBody>
          <Form autocomplete="off">
            <h4 class="ui horizontal divider header">
              Programación de Horario de Mantenimiento
            </h4>
            <Row>
              <Col lg="6">
                <Label>Fecha y Hora de Ingreso</Label>
                <Input type="date" value={this.state.f_programada_inicio} onChange={this.changeFIngreso.bind(this)}/>
                <Input style={{marginTop: "8px"}} type="time" value={this.state.h_programada_inicio} onChange={this.changeHIngreso.bind(this)}/>
              </Col>
              <Col lg="6">
                <Label>Fecha y Hora de Salida</Label>
                <Input type="date" value={this.state.f_programada_fin} onChange={this.changeFSalida.bind(this)}/>
                <Input style={{marginTop: "8px"}} type="time" value={this.state.h_programada_fin} onChange={this.changeHSalida.bind(this)}/>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col lg="6" style={{display: "flex"}}>
              <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#16a1b9", marginRight: "8px"}}>Agregar</Button>
              <Button style={{ backgroundColor: "#16a1b9" }} onClick={this.props.onCancelDateHourClick}>Cancel</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}
