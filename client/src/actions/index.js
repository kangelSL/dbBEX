import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");

export function getAccounts() {
  return function(dispatch) {
    console.log("here1");

    return socket.emit("getAccounts", {}, function(accountData) {
      dispatch({ type: "ACCOUNTS_LOADED", payload: accountData });
    });
  };
}

export function getOrders() {
  return function(dispatch) {
    return socket.emit("getOrders", {}, function(orderData) {
      dispatch({ type: "ORDERS_LOADED", payload: orderData });
    });
  };
}

export function postData() {}

export function updateAccountId() {}

export function getUsers() {
  console.log("getting users");
}
