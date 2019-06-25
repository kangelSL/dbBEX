const ACTION_TYPES = {
  BUY: 1,
  SELL: 2
};

function MatcherApi(order, currentOrders) {
  const findOrder = {
    accountId: +order.accountId,
    quantity: +order.quantity,
    price: +order.price,
    action: +order.action,
    acceptablePricePerCoin: +order.price / +order.quantity
  };

  const result = findTrade(findOrder, currentOrders);

  const resultString = result
    ? ["All traded"]
    : [findOrder.quantity + ` Bitcoins remain from trades`];

  const returnObj = {
    result: resultString,
    originalOrder: order,
    order: findOrder,
    currentOrders: currentOrders
  };

  return returnObj;
}

function findTrade(order, currentOrders) {
  let trade = "";

  if (order.action === 1) {
    trade = currentOrders.find(function(currentOrder) {
      return (
        currentOrder.acceptablePricePerCoin <= order.acceptablePricePerCoin &&
        currentOrder.accountId !== order.accountId &&
        currentOrder.action === ACTION_TYPES.SELL
      );
    });
    // trade = currentOrders.orders.find(
    //   currentOrder =>

    // );
  } else {
    trade = currentOrders.find(function(currentOrder) {
      return (
        currentOrder.acceptablePricePerCoin >= order.acceptablePricePerCoin &&
        currentOrder.accountId !== order.accountId &&
        currentOrder.action === ACTION_TYPES.BUY
      );
    });
    // trade = currentOrders.orders.find(
    //   currentOrder =>

    // );
  }

  if (trade > "") {
    let difference = trade.quantity - order.quantity;

    //Make the trade
    makeTrade(order, trade);

    //Adjust the value of the order
    adjustOrder(trade, difference);

    if (trade.quantity === 0) {
      //Remove from array
      //currentOrders.splice(matchIndex, 1);
    }

    //If user order has been handled return else call the function again
    if (order.quantity === 0) {
      return true;
    } else {
      findTrade(order, currentOrders);
    }
  }

  return;
}

function makeTrade(userTrade, trade) {
  userTrade.quantity =
    trade.quantity > userTrade.quantity
      ? 0
      : userTrade.quantity - trade.quantity;
  userTrade.price = userTrade.acceptablePricePerCoin * userTrade.quantity;
  userTrade.price = +userTrade.price.toFixed(2);
}

function adjustOrder(trade, difference) {
  trade.quantity = difference > 0 ? difference : 0;

  // Only need to adjust price if remaining quantity is above 0
  if (trade.quantity > 0) {
    trade.price = trade.acceptablePricePerCoin * trade.quantity;
    trade.price = +trade.price.toFixed(2);
  } else {
    //Otherwise remove from object
    trade.price = 0;
    trade.quantity = 0;
  }
}

module.exports = MatcherApi;
