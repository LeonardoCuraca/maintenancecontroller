import React, { Component } from "react";
import axios from 'axios';

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
      descripcion: "",
      conformidad: 0,
      observaciones: "asdasd",
      ot_id: this.props.id
    }
  }

  changeDescription(e) {
    this.setState({
      descripcion: e.target.value
    })
  }

  handleSubmit() {
    console.log(this.state);
    axios.post('http://192.168.43.100:8000/api/reque/crear', this.state, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      window.location.reload();
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
        <ModalHeader style={{ backgroundColor: "#574949", color: "#fff" }}>Registrar Nuevo Requerimiento</ModalHeader>
        <ModalBody>
          <Form autocomplete="off">
            <Row>
              <Col lg="12">
                <Label for="chofer">Descripción del Mantenimiento a Realizar</Label>
              </Col>
              <Col lg="12">
                <Input type="text" name="chofer" value={this.state.description} id="chofer" onChange={this.changeDescription.bind(this)}/>
              </Col>
            </Row>
            <div style={{ marginTop: "10px" }}></div>
            <Button onClick={this.handleSubmit.bind(this)} style={{ backgroundColor: "#574949" }}>Agregar</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col lg="6">
              <Button style={{ backgroundColor: "#574949" }} onClick={this.props.onCancelClick}>Cancel</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    );
  }
}

export default NewOTDetail;
