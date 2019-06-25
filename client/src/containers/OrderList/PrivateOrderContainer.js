import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/index";
import OrderListComponent from "../../components/Orders/OrderListComponent";

class PrivateOrderComponent extends Component {
  updateTime;

  componentDidMount() {
    // Call the API to get data
    this.updatePrivateTrades();
  }

  updatePrivateTrades = async () => {
    await this.props.getOrders(this.props.currentAccountId);

    //this.updateTime = setTimeout(this.updatePrivateTrades, 500);
  };

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
