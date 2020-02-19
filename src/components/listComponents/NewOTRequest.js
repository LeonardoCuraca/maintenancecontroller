import React, { Component } from "react";
import axios from 'axios';
import MaterialTable from 'material-table';

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

class NewOTRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: "",
      conformidad: 0,
      observaciones: "asdasd",
      ot_id: this.props.id,
      columns: [
        {
          title: 'Producto',
          field: 'material_id',
          lookup: {

          }
        },
        { title: 'Unidad de Medida', field: 'UM' },
        { title: 'Cantidad', field: 'cantidad' },
      ],
      data: [
      ],
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

  componentWillMount() {
    axios.get('http://192.168.43.100:8000/api/material', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      //Add vehicles to input
      for (var i = 0; i < res.data.data.length; i++) {
        this.state.columns[0].lookup[res.data.data[i].id] = res.data.data[i].descripcion;
      }
    });
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
        <ModalHeader style={{ backgroundColor: "#574949", color: "#fff" }}>Solicitar Materiales</ModalHeader>

        <MaterialTable
          title={"Requerimientos"}
          columns={this.state.columns}
          data={this.state.data}
          options={{
            search: false,
            sorting: false,
            paging: false,
          }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(newData);
                  var data = {
                  }
                  console.log(data);
                  axios.post('http://192.168.43.100:8000/api/otes/crear', data, {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                  }).then(res => {
                    console.log(res);
                    console.log(newData);
                    newData = res.data;
                    newData.id = this.pad(newData.id, 6);
                    console.log(newData);
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }).catch(error => {
                    alert("Error");
                    return;
                  })
                }, 1000);
              }),
              onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(newData);
                  console.log(newData);
                  axios.put('http://192.168.43.100:8000/api/otes/actualizar/' + newData.id, newData, {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem("token")
                    }
                  }).then(res => {
                    console.log(res);
                    console.log(newData);
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }).catch(error => {
                    alert("Error");
                    return;
                  })
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
          localization={{
            header: {
              actions: 'Acciones'
            },
            body: {
              emptyDataSourceMessage: 'No se encontraron registros',
              addTooltip: 'Añadir',
              deleteTooltip: 'Eliminar',
              editTooltip: 'Editar',
              editRow: {
                deleteText: '¿Realmente desea eliminar el registro?',
                cancelTooltip: 'Cancelar',
                saveTooltip: 'Guardar'
              }
            },
          }}
          detailPanel={rowData => {
            return (
              <div>
                Descripción del Material Solicitado
              </div>
            )
          }}
        />
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

export default NewOTRequest;
