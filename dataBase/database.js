const mongoose = require("mongoose");

// building database
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then((c) => {
      console.log(`DateBase Connected with ${c.connection.host}`);
    })
    .catch((e) => {
      alert("error in db");
      console.log("error is", e);
    });
}

module.exports = connectDB;
