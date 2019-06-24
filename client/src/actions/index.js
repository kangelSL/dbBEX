import { ACCOUNTS_LOADED } from "../constants/actionTypes";
import { DATA_POSTED } from "../constants/actionTypes";
import { ORDERS_LOADED } from "../constants/actionTypes";
import { UPDATE_ACCOUNT_ID } from "../constants/actionTypes";
import { UPDATED_STATE } from "../constants/actionTypes";

import store from "../store/store";
import openSocket from "socket.io-client";
const socket = openSocket("localhost:4000");

export function getAccounts() {
  return function(dispatch) {
    return socket.emit("getAccounts", {}, function(accountData) {
      dispatch({ type: ACCOUNTS_LOADED, payload: accountData });
    });
  };
}

export function getMatchedOrders() {
  return function(dispatch) {
    return socket.emit("getTradeHistory", {}, function(myData) {
      dispatch({ type: "ORDERS_HISTORY_LOADED", payload: myData });
    });
  };
}

export function getOrders() {
  return function(dispatch) {
    return socket.emit("getOrders", {}, function(orderData) {
      dispatch({ type: ORDERS_LOADED, payload: orderData });
    });
  };
}

export function postData(payload, orders) {
  return function(dispatch) {
    return socket.emit("postOrder", { payload }, function(nextState) {
      dispatch({ type: DATA_POSTED, payload: nextState });
    });
  };
}

socket.on("setUpdatedState", function(data) {
  store.dispatch({ type: UPDATED_STATE, payload: data.result });
});

export function updateAccountId(payload) {
  return { type: UPDATE_ACCOUNT_ID, payload };
}

export function getUsers() {
  console.log("getting users");
}
