import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");

socket.on("allMessage", function(data) {
  alert(data.message);
});

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

export function updateAccountId() {}

export function getUsers() {
  console.log("getting users");
}
