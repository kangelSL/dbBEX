import React, { Component } from "react";
import AccountDropdown from "../../containers/OrderForm/AccountDropdown";

class RightColumnLayout extends Component {
  render() {
    return (
      <div id="sidebarColumn">
        <AccountDropdown />
      </div>
    );
  }
}

export default RightColumnLayout;
