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

//Connect to MongoDb

// MongoClient.connect(url, function(err, database) {
//   if (err) throw err;

//   console.log("Connected to mongoDb");

//   io.on("connection", function(socket) {
//     console.log("connection made");
//     console.log("connected to socket.io, id: " + socket.id);

//     // Add default user
//     users.insertOne({ socketID: socket.id, username: "Guest" });

//     //Handle initial events
//     socket.on("getData", function(data) {
//       console.log("initial data");
//     });
//   });
// });
