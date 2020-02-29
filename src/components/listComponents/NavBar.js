import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TripOriginIcon from '@material-ui/icons/TripOrigin';

import history from "../../history";

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.area8 = React.createRef();
    this.area9 = React.createRef();
    this.area10 = React.createRef();
    this.area0 = React.createRef();
    this.area1 = React.createRef();
    this.area2 = React.createRef();
    this.area3 = React.createRef();
    this.area4 = React.createRef();
    this.area5 = React.createRef();
    this.area6 = React.createRef();
    this.area7 = React.createRef();
    this.state = {
      area: 0
    }
  }


  ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  cerrarSesion() {
    localStorage.removeItem("token");
    history.push("");
  }

  sendSelectedArea = () => {
    this.props.selectArea(this.state.area)
  }

  setArea(area) {
    this.setState({
      area: area
    }, function() {
      this.sendSelectedArea();
      if (this.props.rol_id != 3) {
        this.setColor();
      }
    })
  }

  setColor() {
    this.area8.current.style.background = "#f3f5f9"
    this.area9.current.style.background = "#f3f5f9"
    this.area10.current.style.background = "#f3f5f9"
    this.area0.current.style.background = "#f3f5f9"
    this.area1.current.style.background = "#f3f5f9"
    this.area2.current.style.background = "#f3f5f9"
    this.area3.current.style.background = "#f3f5f9"
    this.area4.current.style.background = "#f3f5f9"
    this.area5.current.style.background = "#f3f5f9"
    this.area6.current.style.background = "#f3f5f9"
    this.area7.current.style.background = "#f3f5f9"
    if (this.state.area == 8) {
      this.area8.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 9) {
      this.area9.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 10) {
      this.area10.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 0) {
      this.area0.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 1) {
      this.area1.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 2) {
      this.area2.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 3) {
      this.area3.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 4) {
      this.area4.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 5) {
      this.area5.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 6) {
      this.area6.current.style.background = "#e0e2e5"
    }
    if (this.state.area == 7) {
      this.area7.current.style.background = "#e0e2e5"
    }
  }

  render() {

    var classes = makeStyles(theme => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));

    let navBarContent = (<div></div>)

    if (this.props.rol_id == 5 || this.props.rol_id == 4 || this.props.rol_id == 7) {
      navBarContent = (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem ref={this.area0} button onClick={this.setArea.bind(this, 0)}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Listado de OT" />
            </ListItem>
            <Divider />
            <ListItem style={{display: "none"}} ref={this.area8} button onClick={this.setArea.bind(this, 8)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Usuarios" />
            </ListItem>
            <Divider style={{display: "none"}} />
            <ListItem style={{display: "none"}} ref={this.area9} button onClick={this.setArea.bind(this, 9)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Trabajadores" />
            </ListItem>
            <Divider style={{display: "none"}} />
            <ListItem  style={{display: "none"}} ref={this.area10} button onClick={this.setArea.bind(this, 10)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Áreas" />
            </ListItem>
            <Divider style={{display: "none"}} />
            <ListItem ref={this.area1} button onClick={this.setArea.bind(this, 1)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Estructuras" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area2} button onClick={this.setArea.bind(this, 2)}>
              <ListItemIcon>
                <LocalCarWashIcon />
              </ListItemIcon>
              <ListItemText primary="Lavado y Cambio de Aceite" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area3} button onClick={this.setArea.bind(this, 3)}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Neumáticos" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area4} button onClick={this.setArea.bind(this, 4)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento Pesado" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area5} button onClick={this.setArea.bind(this, 5)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento Liviano" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area6} button onClick={this.setArea.bind(this, 6)}>
              <ListItemIcon>
                <LocalGasStationIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento de Gas" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area7} button onClick={this.setArea.bind(this, 7)}>
              <ListItemIcon>
                <AcUnitIcon />
              </ListItemIcon>
              <ListItemText primary="Fríos" />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.cerrarSesion}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
            <Divider />
          </List>
        </div>
      )
    }

    if (this.props.rol_id == 2) {
      navBarContent = (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem ref={this.area0} button onClick={this.setArea.bind(this, 0)}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Listado de OT" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area8} button onClick={this.setArea.bind(this, 8)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Usuarios" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area9} button onClick={this.setArea.bind(this, 9)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Trabajadores" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area10} button onClick={this.setArea.bind(this, 10)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar Áreas" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area1} button onClick={this.setArea.bind(this, 1)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Estructuras" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area2} button onClick={this.setArea.bind(this, 2)}>
              <ListItemIcon>
                <LocalCarWashIcon />
              </ListItemIcon>
              <ListItemText primary="Lavado y Cambio de Aceite" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area3} button onClick={this.setArea.bind(this, 3)}>
              <ListItemIcon>
                <TripOriginIcon />
              </ListItemIcon>
              <ListItemText primary="Neumáticos" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area4} button onClick={this.setArea.bind(this, 4)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento Pesado" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area5} button onClick={this.setArea.bind(this, 5)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento Liviano" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area6} button onClick={this.setArea.bind(this, 6)}>
              <ListItemIcon>
                <LocalGasStationIcon />
              </ListItemIcon>
              <ListItemText primary="Mantenimiento de Gas" />
            </ListItem>
            <Divider />
            <ListItem ref={this.area7} button onClick={this.setArea.bind(this, 7)}>
              <ListItemIcon>
                <AcUnitIcon />
              </ListItemIcon>
              <ListItemText primary="Fríos" />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.cerrarSesion}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
            <Divider />
          </List>
        </div>
      )
    }

    if (this.props.rol_id == 3) {
      var area = this.props.area;
      if (area < 0) {
        area = area * -1
      }
      navBarContent = (
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button onClick={this.setArea.bind(this, area)}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Patio" />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.setArea.bind(this, this.props.area * -1)}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.cerrarSesion}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
            <Divider />
          </List>
        </div>
      )
    }


    return (
      <div>{navBarContent}</div>
    );
  }
}
