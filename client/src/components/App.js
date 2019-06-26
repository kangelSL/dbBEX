import React, { useState, useReducer } from "react";
import SidebarColumnComponent from "./Layout/SidebarColumnComponent";
import LeftColumnComponent from "./Layout/LeftColumnComponent";
import CentreColumnComponent from "./Layout/CentreColumnComponent";
import RightColumnComponent from "./Layout/RightColumnComponent";

import "../styles/columns.scss";

function App() {
  return (
    <div id="appContent" className="column">
      <SidebarColumnComponent />
      <LeftColumnComponent />
      <CentreColumnComponent />
      <RightColumnComponent />
    </div>
  );
}

export default App;
