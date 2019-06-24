import React, { Component } from "react";
import DepthChart from "../Graphs/DepthChartComponent";

class CentreColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <DepthChart />
      </div>
    );
  }
}

export default CentreColumnLayout;
