import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/index";
import OrderListComponent from "../../components/Orders/OrderListComponent";

class UnmatchedOrderContainer extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <div>
        <OrderListComponent orders={this.props.orders} />
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
