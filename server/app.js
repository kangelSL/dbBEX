const MongoClient = require("mongodb").MongoClient;
const io = require("socket.io").listen(4000);

let url = "mongodb://127.0.0.1/bitcoinexchange";

let MatcherApi = require("./matcher");

io.on("connection", function(socket) {
  console.log("A challenger has appeared!!");
  console.log("connection made to socket.io, id: " + socket.id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    console.log("Successfully connected to mongoDb");

    //Set database constants
    const bitcoinexchange = db.db("bitcoinexchange");

    // Set interval to get updates
    // setInterval(function() {
    //   return function(dispatch) {
    //     return socket.emit("getOrders", {}, function(orderData) {
    //       dispatch({ type: ORDERS_LOADED, payload: orderData });
    //     });
    //   };
    // }, 5000);

    //const accounts = bitcoinexchange.collection("accounts");
    //const users = bitcoinexchange.collection("users");

    socket.on("getAccounts", function({}, callback) {
      console.log("Retrieving accounts...");

      const accounts = bitcoinexchange.collection("accounts", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, results) {
          callback(results);
        });
      });
    });

    socket.on("getOrders", function({}, callback) {
      const trades = bitcoinexchange.collection("trades", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, results) {
          callback(results);
        });
      });
    });

    socket.on("getFilteredOrders", function({}, callback) {
      const trades = bitcoinexchange.collection("trades", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, results) {
          callback(results);
        });
      });
    });

    socket.on("getTradeHistory", function({}, callback) {
      const trades = bitcoinexchange.collection("matchedTrades", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, results) {
          callback(results);
        });
      });
    });

    socket.on("postOrder", function(data, callback) {
      const trades = bitcoinexchange.collection("trades", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, tradeData) {
          //Pass current orders to function
          const result = new MatcherApi(data.payload, tradeData);

          const trades = bitcoinexchange.collection("trades");
          const matchedTrades = bitcoinexchange.collection("matchedTrades");
          let orderValues = result.originalOrder;

          // Need to update all unmatched trades
          //trades.deleteMany();
          //trades.insertMany(result.currentOrders);

          // Does new order need to be added into database?
          if (result.order.quantity === 0) {
            // All traded
            matchedTrades.insertOne({
              accountId: orderValues.accountId,
              action: orderValues.action,
              price: +orderValues.price,
              quantity: +orderValues.quantity
            });
          } else {
            trades.insertOne({
              accountId: orderValues.accountId,
              action: orderValues.action,
              price: +orderValues.price,
              quantity: +orderValues.quantity
            });
          }

          //All responders need to be aware of the new state
          socket.broadcast.emit("setUpdatedState", {
            result: result
          });

          //Update state on the screen
          callback(result);
        });
      });
    });
  });
});
