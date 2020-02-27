import React, { Component } from "react";
import axios from 'axios';
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

export default class AsignMaterialModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materiales: [],
      asignados: []
    }
  }

  componentWillMount() {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(this.props.solicitud.id);
    axios.get(host.host + '/api/m_solicitado/solicitud/' + this.props.solicitud.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        materiales: res.data
      }, function() {
        console.log(this.state.materiales);
      })
    })
  }

  changeSolicitante(e) {
    this.setState({
      solicitante: e.target.value
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
    if (this.state.materiales.includes(this.state.material)) {
      console.log(this.state.materiales);
      return;
    }
    if (this.state.material == "") {
      console.log(this.state.materiales);
      return;
    }
    this.setState({
      materialesa: this.state.materiales.push(this.state.material)
    }, function() {
      console.log(this.state.materiales);
      this.setState({
        material: ""
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
    for (var i = 0; i < this.state.materiales.length; i++) {
      axios.put(host.host + '/api/m_solicitado/actualizar/' + this.state.materiales[i].id, this.state.materiales[i], {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        if (res.data.id == this.state.materiales[this.state.materiales.length - 1].id) {
          let estado = {
            estado: 3
          }
          axios.put(host.host + '/api/otes/estado/actualizar/' + this.props.ot, estado).then(res => {
            console.log(res);
            window.location.reload();
          })
        }
      })
    }
  }

  changeARow = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    var temp = this.state.materiales;
    temp[index].asignada = e.target.value;
    this.setState({
      materiales: temp
    }, function(){
      console.log(this.state.materiales);
    })
  }

  changeCRow = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    var temp = this.state.materiales;
    temp[index].cantidad_asignada = e.target.value;
    this.setState({
      materiales: temp
    }, function(){
      console.log(this.state.materiales);
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
        <ModalHeader style={{ backgroundColor: "#29a643", color: "#fff" }}>Asignación de Materiales a Solicitar</ModalHeader>
        <ModalBody>
          <Form autocomplete="off">
            <h4 class="ui horizontal divider header">
              Guía de Materiales
            </h4>
            <div class="ui segment" style={{width: "50%"}}>
              <Row>
                <Col lg="12">
                  <Label>Nombres y Apellidos del Solicitante:</Label>
                  <div style={{float: "right"}}>{this.props.solicitud.solicitante}</div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Label>N° Orden de Trabajo:</Label>
                  <div style={{float: "right"}}>{this.props.solicitud.ot_id}</div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Label>Fecha y Hora de Solicitud:</Label>
                  <div style={{float: "right"}}>{this.props.solicitud.fecha} {this.props.solicitud.hora}</div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col lg="6">
                <table class="ui very basic collapsing celled table">
                  <thead>
                    <tr>
                      <th>Materiales Solicitados</th>
                      <th>Cantidad Solicitada</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.materiales.map(row => {
                    return(
                      <tr>
                        <td>
                          <div class="sub header">{row.solicitada}</div>
                        </td>
                        <td>
                          {row.cantidad_solicitada}
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </Col>
              <Col lg="6">
                <table class="ui very basic collapsing celled table">
                  <thead>
                    <tr>
                      <th>Materiales Asignados</th>
                      <th>Cantidad Asignada</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.materiales.map((row, i) => {
                    return(
                      <tr>
                        <td>
                          {this.props.state != 4 ?
                            <Input type="text" placeholder="Nombre" value={this.state.materiales[i].asignada} onChange={(e) => this.changeARow(e, i)}/>
                            : this.state.materiales[i].asignada
                          }
                        </td>
                        <td>
                          {this.props.state != 4 ?
                            <Input type="number" placeholder="Cantidad" min="1" value={this.state.materiales[i].cantidad_asignada} onChange={(e) => this.changeCRow(e, i)}/>
                            : this.state.materiales[i].cantidad_asignada
                          }
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col lg="6" style={{display: "flex"}}>
              <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#29a643", marginRight: "8px"}}>Finalizar</Button>
              <Button style={{ backgroundColor: "#29a643" }} onClick={this.props.asignClose}>Cancelar</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}
