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
  Form
} from "reactstrap";

export default class MaterialModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitante: "",
      fecha: "2020-02-07",
      hora: "8:00",
      ot_id: this.props.ot,
      materiales: [],
      material: "",
      asignados: [],
      asignado: "",
      solicitud: "",
      cantidades: [],
      cantidad: 1
    }
  }

  changeSolicitante(e) {
    this.setState({
      solicitante: e.target.value
    })
  }

  changeCantidad(e) {
    this.setState({
      cantidad: e.target.value
    }, function() {
      console.log(this.state.cantidad);
    })
  }

  changeMaterial(e) {
    this.setState({
      material: e.target.value
    }, function() {
      console.log(this.state.material);
    })
  }

  addMaterial() {
    console.log(this.state.material);
    console.log(this.state.cantidad);
    if (this.state.materiales.includes(this.state.material)) {
      console.log(this.state.materiales);
      return;
    }
    if (this.state.material == "" || this.state.cantidad == "") {
      console.log(this.state.materiales);
      return;
    }
    this.setState({
      materialesa: this.state.materiales.push(this.state.material),
      cantidadesa: this.state.cantidades.push(this.state.cantidad)
    }, function() {
      console.log(this.state.materiales);
      console.log(this.state.cantidades);
      this.setState({
        material: "",
        cantidad: 1
      })
    })
  }

  changeAsignado(e) {
    this.setState({
      asignado: e.target.value
    }, function() {
      console.log(this.state.asignado);
    })
  }

  addAsignado() {
    console.log(this.state.asignado);
    if (this.state.asignados.includes(this.state.asignado)) {
      console.log(this.state.asignados);
      return;
    }
    if (this.state.asignado == "") {
      console.log(this.state.asignados);
      return;
    }
    this.setState({
      materialesa: this.state.asignados.push(this.state.asignado)
    }, function() {
      console.log(this.state.asignados);
      this.setState({
        asignado: ""
      })
    })
  }

  handleSubmit() {
    this.setState({
      loader: true
    })
    let solicitud = {
      solicitante: this.state.solicitante,
      fecha: this.state.fecha,
      hora: this.state.hora
    }
    console.log(solicitud);
    axios.post(host.host + '/api/solicitud/ordentrabajo/crear/' + this.state.ot_id, solicitud, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.setState({
        solicitud: res.data.id
      }, function() {
        console.log(this.state.solicitud);
        for (var i = 0; i < this.state.materiales.length; i++) {
          let material = {
            solicitada: this.state.materiales[i],
            cantidad_solicitada: this.state.cantidades[i]
          }
          axios.post(host.host + '/api/m_solicitado/solicitud/crear/' + this.state.solicitud, material, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token")
            }
          }).then(res => {
            if (res.data.solicitada == this.state.materiales[this.state.materiales.length - 1]) {
              this.setState({
                loader: false
              })
              window.location.reload();
            }
          })
        }
      })
    })
  }

  deleteRow(row) {
    let m = this.state.materiales;
    m.splice(m.indexOf(row), 1);
    this.setState({
      materiales: m
    })
  }

  deleteRowA(row) {
    let m = this.state.asignados;
    m.splice(m.indexOf(row), 1);
    this.setState({
      asignados: m
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
        <ModalHeader style={{ backgroundColor: "#29a643", color: "#fff" }}>Solicitud de Materiales a Almacén</ModalHeader>
        <ModalBody>
          <Form autocomplete="off">
            <h4 class="ui horizontal divider header">
              Guía de Materiales
            </h4>
            <Row>
              <Col lg="6">
                <Label>Nombres y Apellidos del Solicitante</Label>
                <Input type="text" value={this.state.solicitante} onChange={this.changeSolicitante.bind(this)}/>
              </Col>
            </Row>
            <table className="ui basic table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
            {this.state.materiales.map((row, i) => {
              return(
                <tr onClick={this.deleteRow.bind(this, row)} style={{cursor: "pointer"}}>
                  <td>{row}</td>
                  <td>{this.state.cantidades[i]}</td>
                </tr>
              )
            })}
            </tbody>
            </table>
            <Row>
              <Col lg="6">
                <Input type="text" value={this.state.material} placeholder="Material Solicitado" onChange={this.changeMaterial.bind(this)}/>
              </Col>
              <Col lg="6">
                <Input type="number" min="1" value={this.state.cantidad} placeholder="Cantidad" onChange={this.changeCantidad.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col lg="12" style={{marginTop: "8px"}}>
                <div class="ui green button" onClick={this.addMaterial.bind(this)}>Añadir</div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col lg="6" style={{display: "flex"}}>
              <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#29a643", marginRight: "8px"}}>Agregar</Button>
              <Button style={{ backgroundColor: "#29a643" }} onClick={this.props.onCancelClick}>Cancel</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}
