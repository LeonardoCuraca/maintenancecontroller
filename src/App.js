import React, { Component } from 'react';
import './App.css';

import {
  Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import LoginPage from "./components/LoginPage";
import OT_ListView from "./components/OT_ListView";
import MainMenu from "./components/MainMenu";
import OT_Detail from "./components/OT_Detail";
import GM_List from "./components/GM_List";
import Truck from "./components/Truck";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact="" path="/" component={LoginPage} />
          <Route path="/main" component={MainMenu} />
          <Route path="/ot_detail/:id" component={OT_Detail} />
          <Route path="/truck" component={Truck} />
          <Route path="/gm_list" component={GM_List} />
        </Switch>
      </div>
    )
  }
}
