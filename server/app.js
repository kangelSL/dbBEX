const MongoClient = require("mongodb").MongoClient;
const io = require("socket.io").listen(4000);

let url = "mongodb://127.0.0.1/bitcoinexchange";

let MatcherApi = require("./matcher");

io.on("connection", function(socket) {
  console.log("A challenger has appeared!!");
  console.log("connection made to socket.io, id: " + socket.id);

  // Join the main trades room
  socket.join("unmatchedTrades");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    console.log("Successfully connected to mongoDb");

    //Set database constants
    const bitcoinexchange = db.db("bitcoinexchange");
    const trades = bitcoinexchange.collection("trades");

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
      //Pass current orders to function
      const result = new MatcherApi(data.payload[0], data.payload[1]);

      const matchedTrades = bitcoinexchange.collection("matchedTrades");
      let orderValues = result.originalOrder;

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
          quantity: +orderValues.quantity,
          acceptablePricePerCoin: +orderValues.price / +orderValues.quantity
        });
      }

      //All responders need to be aware of the new state
      socket.to("unmatchedTrades").emit("setUpdatedState", {
        result: result
      });

      //Update state on the screen
      callback(result);
    });
  });
});
