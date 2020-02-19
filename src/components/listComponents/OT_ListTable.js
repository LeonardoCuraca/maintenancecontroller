import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link, Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';

import OTReview from './OTReview';

import history from "../../history";

var dateFormat = require("dateformat");

export default class OT_ListTable extends Component {

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  componentWillMount(){
    //Get user's rol_id
    axios.get('http://192.168.43.100:8000/api/rol/' + this.props.rol_id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(this.props.rol_id);
      console.log(res.data);
    })
    //Get all vehicles
    axios.get('http://192.168.43.100:8000/api/vehiculo', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      //Add vehicles to input
      for (var i = 0; i < res.data.data.length; i++) {
        this.state.columns[8].lookup[res.data.data[i].placa] = res.data.data[i].placa;
        this.state.columns[10].lookup[res.data.data[i].placa] = res.data.data[i].placa;
      }
    });
    //Get all Areas
    axios.get('http://192.168.43.100:8000/api/area', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      //Add vehicles to input
      for (var i = 0; i < res.data.data.length; i++) {
        this.state.columns[11].lookup[res.data.data[i].id] = res.data.data[i].nombre;
      }
    });
    var url = 'http://192.168.43.100:8000/api/otes/';
    //Validate if user's rol is "Jefe de Area"
    if (this.props.rol_id == 3) {
      axios.get('http://192.168.43.100:8000/api/area/encargado/' + this.props.user_id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(this.props.user_id);
        console.log(res.data[0]);
        console.log(res.data[0].id);
        url = 'http://192.168.43.100:8000/api/otes/area/' + res.data[0].id
        axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        }).then(res => {
          console.log(url);
          console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].id = this.pad(res.data[i].id, 6);
          }
          this.setState({
            data: res.data
          })
          this.props.toggleLoader()
        });
      })
    } else {
      axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data.data);
        for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].id = this.pad(res.data.data[i].id, 6);
        }
        this.setState({
          data: res.data.data
        })
        this.props.toggleLoader()
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      TokenState: '',
      title: '',
      columns: [
        { title: 'N°', field: 'id', editable: 'never' },
        { title: 'Fecha Inicio', field: 'fecha', type: 'date', filtering: false, editable: 'onAdd' },
        { title: 'Hora Inicio', field: 'h_ingreso', type: 'time', filtering: false, editable: 'onAdd' },
        { title: 'Fecha Fin', field: 'fecha_fin', type: 'date', filtering: false, editable: 'onUpdate' },
        { title: 'Hora Fin', field: 'hora_fin', type: 'time', filtering: false, editable: 'onUpdate' },
        { title: 'Conductor', field: 'conductor' },
        { title: 'DNI', field: 'dni' },
        { title: 'Operación', field: 'operacion' },
        {
          title: 'Placa Vehículo',
          field: 'vehiculo_id',
          lookup: {

          }
        },
        { title: 'Tipo de Vehículo', editable: 'never', field: 'tipo_vehiculo' },
        {
          title: 'Placa Acoplado',
          field: 'acoplado',
          lookup: {

          }
        },
        {
          title: 'Área',
          field: 'area_id',
          lookup: {

          },
          editable: 'onAdd'
        },
        { title: 'Encargado', field: 'encargado_id', editable: 'onUpdate' },
        { title: 'Estado', field: 'estado', editable: 'onUpdate' },
        {
          title: 'Prioridad',
          field: 'prioridad',
          lookup: {
            0: "Normal",
            1: "Importante",
            2: "Muy Importante",
            3: "Debe salir Hoy"
          }
        },
      ],
      data: [
      ],
    }
  }

  render() {

    if(window.innerWidth <= 800) {
      this.title="OT"
    } else {
      this.title="Listado de Órdenes de Trabajo"
    }

    let editable = {}

    if (this.props.rol_id != 2 || this.props.rol_id != 3) {
      editable = {
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(newData);
              var data = {
                conductor: newData.conductor,
                fecha: dateFormat(newData.fecha, "yyyy-mm-dd"),
                h_ingreso: dateFormat(newData.h_ingreso, "HH:mm:ss"),
                dni: newData.dni,
                estado: "En Revisión",
                vehiculo_id: newData.vehiculo_id,
                operacion: newData.operacion,
                area_id: newData.area_id,
                acoplado: newData.acoplado,
                encargado_id: "Por Definir",
                man_realizado: "",
                prioridad: newData.prioridad
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
              if (newData.fecha_fin) {
                newData.fecha_fin = dateFormat(newData.fecha_fin, "yyyy-mm-dd");
              }
              if (newData.hora_fin) {
                newData.hora_fin = dateFormat(newData.hora_fin, "HH:mm:ss");
              }
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
      }
    }

    return (
      <MaterialTable
        title={this.title}
        columns={this.state.columns}
        data={this.state.data}
        onRowClick={(event, rowData, togglePanel) => history.push("ot_detail/" + rowData.id)}
        editable={editable}
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
          grouping: {
            placeholder: 'Arrastre los encabezados para agrupar',
            groupedBy: 'Agrupado por:'
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar'
          },
          pagination: {
            labelRowsSelect: 'filas',
            labelDisplayedRows: '{from}-{to} de {count}',
            firstTooltip: 'Primera Página',
            previousTooltip: 'Anterior Página',
            nextTooltip: 'Siguiente Página',
            lastTooltip: 'Última Página'
          }
        }}
        options={{
          grouping: true,
          filtering: true,
          deleting: false
        }}
        icons={{
          Select: () => 'Add Row',
          Filter: () => <div/>
        }}
        detailPanel={rowData => {
          return (
            <div>
              <OTReview
                review={rowData.observaciones}
                otid={rowData.id}
              />
            </div>
          )
        }}
      />
    );
  }
}
