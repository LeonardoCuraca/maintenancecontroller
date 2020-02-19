import React, { Component } from "react";
import axios from 'axios';
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Fab from '@material-ui/core/Fab';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MaterialTable from 'material-table';
import TableFooter from '@material-ui/core/TableFooter';
import OTReview from './OTReview';

import history from "../../history";

import DetailReview from './DetailReview';
import NewOTDetail from './NewOTDetail';
import NewOTRequest from './NewOTRequest';

import * as host from '../host.js';

import "./style/OT_DetailTable.css";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedid: "",
      selecteddesc: "",
      isReviewOpen: false,
      checkedA: true,
      count: 1,
      headings: [
        { centered: false, id: "tHead1", text: "ID" },
        { centered: false, id: "tHead2", text: "Descripción" },
      ],
      items: [],
      text: {
        companyLogo: "https://cdn4.buysellads.net/uu/1/54614/1572534249-O1.png",
        empresa: "CRJ",
        conductor: "Edwin Gora Chamorro",
        dni: "04065817",
        placaT: "C1L-758",
        placaC: "F2A-985",
        otDate: "20-10-2019",
        otHour: "14:00 p.m.",
        otNum: "000488"
      },
      columns: [
        { title: 'Descripción', field: 'descripcion', editable: 'never' },
        { title: 'Conformidad', field: 'conformidad' },
      ],
      data: [
      ],
    };
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  componentWillMount(){
    axios.get(host.host + '/api/otes/' + this.props.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data[0]);
      var data = res.data[0];
      this.setState({
        text: {
          conductor: data.conductor,
          dni: data.dni,
          placaT: data.vehiculo_id,
          placaC: data.extra,
          otDate: data.fecha,
          otHour: data.h_ingreso,
          otNum: this.pad(data.id, 6)
        }
      });
      console.log(this.state);
      axios.get(host.host + '/api/reque/' + this.props.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        this.setState({
          data: res.data
        })
      });
    });
  }

  // handle file upload (logo)
  handleFileUpload = e => {
    const file = e.target.files[0];
    this.setState(prevState => ({
      text: {
        ...prevState.text,
        companyLogo: URL.createObjectURL(file)
      }
    }));
    //Or this
    // e.persist();
    // this.setState(prevState => ({
    //   text: {
    //     ...prevState.text,
    //     companyLogo: URL.createObjectURL(e.target.files[0])
    //   }
    // }));
  };

  //Add default Image
  addDefaultSrc = ev => {
    ev.target.src = "http://lees.fe.uni-lj.si/uploads/default-logo.png";
  };

  // Handle Invoice Date
  handleDayChange = day => {
    this.setState(prevState => ({
      text: {
        ...prevState.text,
        invoiceDate: day
      }
    }));
  };

  // Update Table Headings
  handleOnChange = e => {
    const { name: id, value: text } = e.target;
    this.setState(({ headings }) => ({
      headings: headings.map(
        heading => (heading.id === id ? { ...heading, text } : heading)
      )
    }));
  };

  // Add new item to the Items list
  handleOnClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      items: [
        ...prevState.items,
        { id: this.state.count, description: "", hours: "", rate: "" }

      ]
    }));
  };

  // Update Item
  handleItemUpdate = (e, id) => {
    const { name, value } = e.target;
    const { items } = this.state;

    const findItem = items.find(item => item.id === id);

    this.setState(({ items }) => ({
      items: items.map(
        item => (item.id === findItem.id ? { ...item, [name]: value } : item)
      )
    }));
  };

  // Remove item from Items list
  handleRemoveItem = id => {
    const { items } = this.state;
    const removeIndex = items.findIndex(item => item.id === id);
    const updatedItems = [
      ...items.slice(0, removeIndex),
      ...items.slice(removeIndex + 1)
    ];

    this.setState({ items: updatedItems, count: this.state.count - 1 });
  };

  //handle company and cliend info change
  handleOnChangeCompanyInfo = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      text: {
        ...prevState.text,
        [name]: value
      }
    }));
  };

  onButtonClick = () => {
    this.setState({ isPopupOpen: true });
  };

  onCancelClick = () => {
    this.setState({ isPopupOpen: false });
  };

  handleChange() {
    this.setState({
      checkedA: !this.state.checkedA
    });
  };

  showReview(id, description) {
    console.log(id + " " + description);
    this.showReviewT();
  }

  showReviewT(){
    console.log(this.state);
    this.setState({
      isReviewOpen: true
    })
  }

  hiddeReview() {
    this.setState({
      isReviewOpen: false
    })
  }

  render() {

    const handleDelete = (id) => {
      axios.delete(host.host + '/api/reque/eliminar/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        window.location.reload();
      })
    }

    const showRequest = () => {
      this.setState({
        isRequestOpen: true
      })
    }

    const hiddeRequest = () => {
      this.setState({
        isRequestOpen: false
      })
    }

    return (
      <div className="wrapper">
        <div className="download-container">
          <ReactToPrint
            trigger={() => (
              <a href="#" className="download-btn">
                Imprimir OT
              </a>
            )}
            content={() => this.componentRef}
          />
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            style={{marginLeft: "16px"}}
            onClick={event => showRequest(this.props.id)}
          >
            <NavigationIcon style={{marginRight: "8px"}}/>
            Solicitar Materiales
          </Fab>
          <NewOTDetail
            id={this.props.id}
            isPopupOpen={this.state.isPopupOpen}
            onCancelClick={this.onCancelClick}
          />
          <DetailReview
            id={this.state.selectedid}
            description={this.state.selecteddesc}
            isPopupOpen={this.state.isReviewOpen}
            onCancelClick={this.hiddeReview}
          />
          <NewOTRequest
            id={this.props.id}
            isPopupOpen={this.state.isRequestOpen}
            onCancelClick={hiddeRequest}
          />
        </div>
        <div className="container" ref={el => (this.componentRef = el)}>
          <div className="text-container">
            <div className="text left">
              <h2 className="invoice-title"><span style={{fontWeight: "400"}}>Orden de Trabajo </span>para Mantenimiento</h2>
              <div className="compnay-info">
                <div className="compnay-input-container">
                  <p>Conductor: {this.state.text.conductor}</p>
                </div>
                <div className="compnay-input-container">
                  <p>DNI: {this.state.text.dni}</p>
                </div>
                <div className="compnay-input-container">
                  <p>Placa Tracto: {this.state.text.placaT}</p>
                </div>
                <div className="compnay-input-container">
                  <p>Placa Carreta: {this.state.text.placaC}</p>
                </div>
              </div>
              {/*compnay-info-ends*/}
            </div>
            {/* Right Starts here*/}
            <div className="text right">
              <div className="logo-container">
                <img
                  src="https://carley.com.pe/pre-produccion/carley//assets/img/logos/logo-blanco.png"
                />
              </div>
              <div className="invoice-container">
                <div className="sc-bdVaJa cJYNBQ">
                  <label>N° OT</label>
                  <div>
                    <p>{this.state.text.otNum}</p>
                  </div>
                </div>
                <div className="sc-bZQynM frsoyH">
                  <label>Fecha</label>
                  <div>
                    <p>{this.state.text.otDate}</p>
                  </div>
                </div>
                <div className="sc-bZQynM frsoyH">
                  <label>Hora de Ingreso</label>
                  <div>
                    <p>{this.state.text.otHour}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="table-container"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "3em 0px"
            }}
          >
          <TableContainer component={Paper}>
                <MaterialTable
                  title={"Requerimientos"}
                  columns={this.state.columns}
                  data={this.state.data}
                  onRowClick={(event, rowData, togglePanel) => history.push("ot_detail/" + rowData.id)}
                  options={{
                    search: false,
                    sorting: false,
                    paging: false,
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
                        <OTReview
                          review={rowData.observaciones}
                          otid={rowData.id}
                        />
                      </div>
                    )
                  }}
                />
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} align="justify" variant="footer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</TableCell>
                </TableRow>
              </TableFooter>
          </TableContainer>
            <div id="invoiceDropdown" onClick={this.onButtonClick} className="add-more-btn">
              <span>+ Añadir Requerimiento</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
