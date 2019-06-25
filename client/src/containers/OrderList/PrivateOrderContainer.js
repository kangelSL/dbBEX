import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/index";
import OrderListComponent from "../../components/Orders/OrderListComponent";

class PrivateOrderComponent extends Component {
  componentDidMount() {
    // Call websocket to get data
    this.props.getOrders();
  }

  getListItems() {
    let currentAccountId = this.props.currentAccountId;

    return this.props.orders.filter(function(order) {
      return +order.accountId === +currentAccountId;
    });
  }

  render() {
    return (
      <div>
        <p>Current account: Account{this.props.currentAccountId}</p>
        <OrderListComponent orders={this.getListItems()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    currentAccountId: state.currentAccountId
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
)(PrivateOrderComponent);
