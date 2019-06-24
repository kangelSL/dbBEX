import React, { Component } from "react";
import DepthChart from "../Graphs/DepthChartComponent";
import HeaderComponent from "../PageElements/HeaderComponent";
import AggregateOrderContainer from "../../containers/OrderList/AggregateOrderContainer";

class CentreColumnLayout extends Component {
  render() {
    return (
      <div id="centreColumn">
        <HeaderComponent title="Price Charts" id="headerComponent" />
        <DepthChart />
        <AggregateOrderContainer />
      </div>
    );
  }
}

export default CentreColumnLayout;
