const app = require("./app");
const connectToDB = require("./dataBase/database");

// database
connectToDB();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API_Root</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(
    `listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
}); 
