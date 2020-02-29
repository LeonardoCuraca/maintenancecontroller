import React, { Component } from 'react';

import "./style/MainCardsStyles.css";

export default class MainCards extends Component {

  render() {
    return(
      <div style={{padding: "16px"}} className="ui cards">
        {this.props.rol !== 4 ?
          <div onClick={this.props.showBlue} style={{cursor: "pointer", height: "100%", background: "#16a1b9", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
            <div style={{padding: "4px"}} className="ui statistic">
              <div style={{color: "#f3f5f9"}} className="value">
                <i style={{fontSize: "48px"}} aria-hidden="true" className="bell outline icon"/>
              </div>
              <div style={{color: "#f3f5f9"}} class="label">Entrantes</div>
            </div>
          </div>
          : null
        }
        {this.props.rol !== 4 ?
          <div onClick={this.props.showRed} style={{cursor: "pointer", height: "100%", background: "#dc3547", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
            <div style={{padding: "4px"}} className="ui statistic">
              <div style={{color: "#f3f5f9"}} className="value">
                <i style={{fontSize: "48px"}} aria-hidden="true" className="pencil icon"/>
              </div>
              <div style={{color: "#f3f5f9"}} className="label">En Revisión</div>
            </div>
          </div>
          : null
        }
        <div onClick={this.props.showGreen} style={{cursor: "pointer", height: "100%", background: "#29a643", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
          <div style={{padding: "4px"}} className="ui statistic">
            <div style={{color: "#f3f5f9"}} className="value">
              <i style={{fontSize: "48px"}} aria-hidden="true" className="warning icon"/>
            </div>
            <div style={{color: "#f3f5f9"}} className="label">En espera de Materiales</div>
          </div>
        </div>
        {this.props.rol !== 4 ?
          <div onClick={this.props.showYellow} style={{cursor: "pointer", height: "100%", background: "#fec106", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
            <div style={{padding: "4px"}} className="ui statistic">
              <div style={{color: "#f3f5f9"}} className="value">
                <i style={{fontSize: "48px"}} aria-hidden="true" className="configure icon"/>
              </div>
              <div style={{color: "#f3f5f9"}} className="label">En Proceso</div>
            </div>
          </div>
          : null
        }
        {this.props.rol !== 4 ?
          <div onClick={this.props.showOrange} style={{cursor: "pointer", height: "100%", background: "#ff5e00", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
            <div style={{padding: "4px"}} className="ui statistic">
              <div style={{color: "#f3f5f9"}} className="value">
                <i style={{fontSize: "48px"}} aria-hidden="true" className="stopwatch icon"/>
              </div>
              <div style={{color: "#f3f5f9"}} className="label">Finalizados</div>
            </div>
          </div>
          : null
        }
        {this.props.rol !== 4 ?
          <div onClick={this.props.showPurple} style={{cursor: "pointer", height: "100%", background: "#9d00ff", boxShadow: '3px 4px 5px 0px rgba(0,0,0,0.25)'}} className="ui card">
            <div style={{padding: "4px"}} className="ui statistic">
              <div style={{color: "#f3f5f9"}} className="value">
                <i style={{fontSize: "48px"}} aria-hidden="true" className="clipboard check icon"/>
              </div>
              <div style={{color: "#f3f5f9"}} className="label">Dados de Alta</div>
            </div>
          </div>
          : null
        }
      </div>
    )
  }

}
