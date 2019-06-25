import React, { Component } from "react";
import RecentOrderContainer from "../../containers/OrderList/RecentOrderContainer";
import PrivateOrderContainer from "../../containers/OrderList/PrivateOrderContainer";
import HeaderComponent from "../PageElements/HeaderComponent";

class RightColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <HeaderComponent title="Trade History" id="headerComponent" />
        <RecentOrderContainer />
        <HeaderComponent title="Private Order Book" id="headerComponent" />
        <PrivateOrderContainer />
      </div>
    );
  }
}

export default RightColumnLayout;
