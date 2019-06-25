import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/index";
import OrderListComponent from "../../components/Orders/OrderListComponent";

class UnmatchedOrderContainer extends Component {
  updateTime;

  componentDidMount() {
    // Call the API to get data
    this.updateUnmatchedTrades();
  }

  updateUnmatchedTrades = async () => {
    await this.props.getOrders();

    this.updateTime = setTimeout(this.updateUnmatchedTrades, 500);
  };

  getListItems() {
    if (typeof this.props.orders !== "undefined") {
      return this.props.orders;
    } else {
      return {};
    }
  }

  render() {
    return (
      <div>
        <OrderListComponent orders={this.getListItems()} />
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
