import React, { Component } from "react";
import UnmatchedOrderContainer from "../../containers/OrderList/UnmatchedOrderContainer";

class SidebarColumnLayout extends Component {
  render() {
    return (
      <div id="leftColumn">
        <UnmatchedOrderContainer />
      </div>
    );
  }
}

export default SidebarColumnLayout;
