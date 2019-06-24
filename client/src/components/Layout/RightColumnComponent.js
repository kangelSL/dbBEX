import React, { Component } from "react";
import RecentOrderContainer from "../../containers/OrderList/RecentOrderContainer";
import HeaderComponent from "../PageElements/HeaderComponent";

class RightColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <HeaderComponent title="Trade History" id="headerComponent" />
        <RecentOrderContainer />
      </div>
    );
  }
}

export default RightColumnLayout;
