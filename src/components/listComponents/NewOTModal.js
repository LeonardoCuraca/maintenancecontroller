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

class NewOTDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conductor: "",
      encargado_id: 0,
      fecha_ingreso: "",
      h_ingreso: "",
      dni: "",
      estado: 1,
      vehiculo_id: "",
      area_id: this.props.area,
      acoplado: "",
      operacion: "",
      prioridad: 1,
      correlativo: "",
      loader: false,
      mensaje: "",
      placaTemporal: false,
      codigo_acceso: 0
    }
  }

  changeConductor(e) {
    this.setState({
      conductor: e.target.value
    })
  }

  changeFecha(e) {
    this.setState({
      fecha_ingreso: e.target.value
    })
  }

  changeHoraIngreso(e) {
    this.setState({
      h_ingreso: e.target.value
    })
  }

  changeDni(e) {
    this.setState({
      dni: e.target.value
    })
  }

  changePlaca(e) {
    this.setState({
      vehiculo_id: e.target.value
    })
  }

  changeAcoplado(e) {
    this.setState({
      acoplado: e.target.value
    })
  }

  changeOperacion(e) {
    this.setState({
      operacion: e.target.value
    })
  }

  changeCorrelativo(e) {
    this.setState({
      correlativo: e.target.value
    })
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  handleSubmit() {
    console.log(this.state);
    if (this.state.conductor == "" || this.state.dni == "" || this.state.correlativo == "" || this.state.fecha_ingreso == "" || this.state.h_ingreso == "" || this.state.vehiculo_id == "") {
      this.setState({
        mensaje: "Completar los campos señalados"
      })
      return
    }

    if (this.state.codigo_acceso == 0) {
      this.setState({
        correlativo: "00" + this.props.area + "-" + this.pad(this.state.correlativo, 6)
      })
    }

    this.setState({
      loader: true
    }, function() {
      axios.post(host.host + '/api/otes/crear', this.state, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        if (res.data == 1) {
          this.setState({
            loader: false,
            mensaje: "Vehículo Inexistente",
            placaTemporal: true,
            codigo_acceso: 1
          })
        } else {
          this.props.reload();
          this.props.onCancelClick();
        }
      })
    })
  }

  handleSubmitTemp() {

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
        <ModalHeader style={{ backgroundColor: "#16a1b9", color: "#fff" }}>Registrar Nueva Orden de Trabajo </ModalHeader>
        <ModalBody>
          <Form autocomplete="off">
            <h4 class="ui horizontal divider header">
              Datos del Conductor
            </h4>
            <Row>
              <Col lg="6">
                <Label>Nombres y Apellidos <p style={{color: "red", display: "contents"}}>*</p></Label>
                <Input type="text" value={this.state.conductor} onChange={this.changeConductor.bind(this)}/>
              </Col>
              <Col lg="6">
                <Label>DNI <p style={{color: "red", display: "contents"}}>*</p></Label>
                <Input type="text" value={this.state.dni} onChange={this.changeDni.bind(this)}/>
              </Col>
            </Row>
            <h4 class="ui horizontal divider header">
              Datos de la Orden de Trabajo
            </h4>
            <Row>
              <Col lg="4">
                <Label>Correlativo <p style={{color: "red", display: "contents"}}>*</p></Label>
                <Input type="text" value={this.state.correlativo} onChange={this.changeCorrelativo.bind(this)}/>
              </Col>
              <Col lg="4">
                <Label>Fecha de Ingreso <p style={{color: "red", display: "contents"}}>*</p></Label>
                <Input type="date" value={this.state.fecha} onChange={this.changeFecha.bind(this)}/>
              </Col>
              <Col lg="4">
                <Label>Hora de Ingreso <p style={{color: "red", display: "contents"}}>*</p></Label>
                <Input type="time" value={this.state.h_ingreso} onChange={this.changeHoraIngreso.bind(this)}/>
              </Col>
            </Row>
            <h4 class="ui horizontal divider header">
              Datos del Vehículo
            </h4>
            <Row>
              <Col lg="12">
                <Label>Placa <p style={{color: "red", display: "contents"}}>*</p></Label>
              </Col>
              <Col lg="12">
                <Input type="text" value={this.state.vehiculo_id} onChange={this.changePlaca.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Label>Acoplado</Label>
              </Col>
              <Col lg="12">
                <Input type="text" value={this.state.acoplado} onChange={this.changeAcoplado.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Label>Operación</Label>
              </Col>
              <Col lg="12">
                <Input type="text" value={this.state.operacion} onChange={this.changeOperacion.bind(this)}/>
              </Col>
            </Row>
            <h4 style={{color: "red"}} class="ui horizontal divider header">
              {this.state.mensaje}
            </h4>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row style={{width: "100%"}}>
            <Col lg="6" style={{display: "flex"}}>
              {this.state.placaTemporal ?
                <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#16a1b9", marginRight: "8px"}}>Agregar con Placa Nueva</Button>
                : null
              }
              <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#16a1b9", marginRight: "8px"}}>Agregar</Button>
              <Button style={{ backgroundColor: "#16a1b9" }} onClick={this.props.onCancelClick}>Cancel</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewOTDetail;
