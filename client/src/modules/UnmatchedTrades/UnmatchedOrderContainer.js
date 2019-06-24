import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/index";

class UnmatchedOrderContainer extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <div>
        <p>Unmatched orders container </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: order => dispatch(getOrders(order))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnmatchedOrderContainer);
