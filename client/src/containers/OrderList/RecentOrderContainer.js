import React, { Component } from "react";
import { connect } from "react-redux";
import { getMatchedOrders } from "../../actions/index";
import OrderListComponent from "../../components/Orders/OrderListComponent";

class RecentOrderContainer extends Component {
  updateTime;

  componentDidMount() {
    // Call the API to get data
    this.updateRecentTrades();
  }

  updateRecentTrades = async () => {
    await this.props.getMatchedOrders();

    this.updateTime = setTimeout(this.updateRecentTrades, 500);
  };

  getListItems() {
    if (typeof this.props.matchedOrders !== "undefined") {
      return this.props.matchedOrders;
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
    orders: state.orders,
    matchedOrders: state.matchedOrders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMatchedOrders: order => dispatch(getMatchedOrders(order))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentOrderContainer);
