import React, { Component } from "react";
import { connect } from "react-redux";
import { AggregateData } from "../../reducers/data";
import { getOrders } from "../../actions/index";
import HeaderComponent from "../../components/PageElements/HeaderComponent";
import "../../styles/app.scss";

class AggregateOrderContainer extends Component {
  updateTime;

  componentDidMount() {
    // Call the API to get data
    this.updateAggregateTrades();
  }

  updateAggregateTrades = async () => {
    this.props.getOrders();
  };

  getBuyListItems() {
    let aggregateArray = AggregateData(this.props.orders);

    let buyBook = aggregateArray[0];

    return buyBook.map((order, index) => {
      return (
        <tr key={index} className="buyText">
          <th scope="col"> {order.price} </th>
          <th scope="col"> {order.quantity} </th>
        </tr>
      );
    });
  }

  getSellListItems() {
    let aggregateArray = AggregateData(this.props.orders);

    let sellBook = aggregateArray[1];

    return sellBook.map((order, index) => {
      return (
        <tr key={index} className="sellText">
          <th scope="col"> {order.price} </th>
          <th scope="col"> {order.quantity} </th>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="clearfix">
        <div className="box">
          <HeaderComponent title="Buy" />
          <div className="centreContent">
            <table>
              <thead>
                <tr className="tableHeading">
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>{this.getBuyListItems()}</tbody>
            </table>
          </div>
        </div>
        <div className="box">
          <HeaderComponent title="Sell" />
          <div className="centreContent">
            <table>
              <thead>
                <tr className="tableHeading">
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>{this.getSellListItems()}</tbody>
            </table>
          </div>
        </div>
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
)(AggregateOrderContainer);
