import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");

export function getAccounts() {
  console.log("get accounts");
}

export function getOrders() {
  console.log("get order actions");
  return function(dispatch) {
    return socket.emit("getOrders", {}, function(orderData) {
      console.log("callback here");
      console.log(orderData);
      dispatch({ type: "ORDERS_LOADED", payload: orderData });
    });
  };
}

export function getUsers() {
  console.log("getting users");
}
