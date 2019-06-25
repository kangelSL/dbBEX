import React from "react";
import "../../styles/app.scss";

const OrderListComponent = ({ orders }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr
            key={index}
            className={order.action === 1 ? "buyText" : "sellText"}
          >
            <th scope="col"> {order.quantity} </th>
            <th scope="col"> {order.price} </th>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderListComponent;
