class Order {
  constructor(accountId, quantity, price, action) {
    this.accountId = +accountId;
    this.price = +price;
    this.quantity = +quantity;
    this.action = +action;

    this.acceptablePricePerCoin = this.price / this.quantity;
  }

  adjustOrder(reduceQuantity) {
    this.quantity =
      reduceQuantity > this.quantity ? 0 : this.quantity - reduceQuantity;
    this.price = this.acceptablePricePerCoin * this.quantity;
  }
}

function getOrders() {
  return [
    //accountId, quantity, price, action

    // Sell data
    new Order(1, 180, 70, 2),
    new Order(2, 150, 80, 2),
    new Order(3, 130, 90, 2),
    new Order(4, 120, 95, 2),
    new Order(5, 115, 96, 2),
    new Order(1, 110, 97, 2),
    new Order(2, 109, 100, 2),
    new Order(3, 108, 100, 2),
    new Order(4, 107, 105, 2),
    new Order(5, 107, 110, 2),
    new Order(1, 106, 112, 2),
    new Order(2, 105, 114, 2),
    new Order(3, 104, 116, 2),
    new Order(4, 103, 118, 2),
    new Order(5, 100, 120, 2),

    //Buy data
    new Order(1, 100, 130, 1),
    new Order(2, 110, 140, 1),
    new Order(3, 120, 150, 1),
    new Order(4, 130, 160, 1),
    new Order(5, 150, 170, 1),
    new Order(1, 160, 180, 1),
    new Order(2, 170, 190, 1),
    new Order(3, 180, 200, 1)
  ];
}

function getData() {
  return {
    orders: getOrders()
  };
}

module.exports = getData;
