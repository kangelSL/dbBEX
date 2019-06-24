export function AggregateData(orderData) {
  let sellBook = [];
  let buyBook = [];

  let sellOrders = orderData ? orderData.filter(data => data.action === 2) : [];
  let buyOrders = orderData ? orderData.filter(data => data.action === 1) : [];

  sellOrders.reduce(function(res, value) {
    if (!res[value.price]) {
      res[value.price] = { price: value.price, quantity: value.quantity };
      sellBook.push(res[value.price]);
    } else {
      res[value.price].quantity += value.quantity;
    }
    return res;
  }, {});

  buyOrders.reduce(function(res, value) {
    if (!res[value.price]) {
      res[value.price] = { price: value.price, quantity: value.quantity };
      buyBook.push(res[value.price]);
    } else {
      res[value.price].quantity += value.quantity;
    }

    return res;
  }, {});

  return [buyBook, sellBook];
}
