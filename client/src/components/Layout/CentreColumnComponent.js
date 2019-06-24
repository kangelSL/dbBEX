import React, { Component } from "react";
import DepthChart from "../Graphs/DepthChartComponent";
import HeaderComponent from "../PageElements/HeaderComponent";

class CentreColumnLayout extends Component {
  render() {
    return (
      <div id="centreColumn">
        <HeaderComponent title="Price Charts" id="headerComponent" />
        <DepthChart />
      </div>
    );
  }
}

export default CentreColumnLayout;
