import React, { Component } from "react";
import AccountDropdown from "../../containers/OrderForm/AccountDropdown";
import OrderFormContainer from "../../containers/OrderForm/OrderFormContainer";

class SidebarColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <AccountDropdown />
        <OrderFormContainer />
      </div>
    );
  }
}

export default SidebarColumnLayout;
