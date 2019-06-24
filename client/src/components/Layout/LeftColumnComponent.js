import React, { Component } from "react";
import UnmatchedOrderContainer from "../../containers/OrderList/UnmatchedOrderContainer";
import HeaderComponent from "../PageElements/HeaderComponent";

class SidebarColumnLayout extends Component {
  render() {
    return (
      <div id="leftColumn">
        <HeaderComponent title="Order Books" id="headerComponent" />
        <UnmatchedOrderContainer />
      </div>
    );
  }
}

export default SidebarColumnLayout;
