import React, { Component } from "react";
import "../../styles/pageElements.scss";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header">
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default HeaderComponent;
