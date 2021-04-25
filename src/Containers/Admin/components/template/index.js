import React, { Component } from "react";
import SidebarComponent from "../sidebar";
import "./index.scss";
class Template extends Component {
  render() {
    return (
      <>
        <div className="d-flex">
          <div className="col-sm-2 p-0">
            <div className="sideBar__background col-sm-2 p-0">
              <div className="col-sm-2 background">
                <SidebarComponent />
              </div>
            </div>
          </div>

          <div className="col-sm-10">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default Template;
