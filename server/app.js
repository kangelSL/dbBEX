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
      console.log("Retrieving orders...");
      const trades = bitcoinexchange.collection("trades", function(
        err,
        collection
      ) {
        collection.find({}).toArray(function(err, results) {
          callback(results);
        });
      });
    });

    socket.on("postOrder", function(data, callback) {
      const result = new MatcherApi(data.payload);
      console.log("processed order");
      //Testing broadcast emit
      socket.broadcast.emit("allMessage", {
        message: "All responders should see this message"
      });

      callback(result);
    });
  });
});
