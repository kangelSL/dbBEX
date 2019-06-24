import React, { Component } from "react";
import AccountDropdown from "../../containers/OrderForm/AccountDropdown";
import OrderFormContainer from "../../containers/OrderForm/OrderFormContainer";
import HeaderComponent from "../PageElements/HeaderComponent";

class SidebarColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <HeaderComponent title="Bitcoin Exchange" id="headerComponent" />
        <AccountDropdown />
        <OrderFormContainer />
      </div>
    );
  }
}

export default SidebarColumnLayout;
