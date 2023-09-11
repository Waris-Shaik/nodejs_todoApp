const mongoose = require("mongoose");

// building database
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => {
      console.log("DateBase Connected");
    })
    .catch((e) => {
      alert("error in db");
      console.log("error is", e);
    });
}

module.exports = connectDB;
