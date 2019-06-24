const MongoClient = require("mongodb").MongoClient;
const io = require("socket.io").listen(4000);

let url = "mongodb://127.0.0.1/bitcoinexchange";

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

      //Testing broadcast emit
      socket.broadcast.emit("logon", {
        socketID: socket.id,
        username: {}
      });

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
  });
});