import store from "../store/store";
import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");

export function getAccounts() {
  return function(dispatch) {
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

export function postData(payload, orders) {
  return function(dispatch) {
    return socket.emit("postOrder", { payload }, function(nextState) {
      dispatch({ type: "DATA_POSTED", payload: nextState });
    });
  };
}

socket.on("setUpdatedState", function(data) {
  store.dispatch({ type: "UPDATED_STATE", payload: data.result });
});

export function updateAccountId() {}

export function getUsers() {
  console.log("getting users");
}
