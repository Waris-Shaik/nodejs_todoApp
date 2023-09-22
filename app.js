const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/task");
const dotenv = require("dotenv");
const { errorMiddleWare } = require("./middlewares/error");
const cors = require("cors");

dotenv.config({
  path: "./dataBase/config.env",
}); 

// making cors active
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// cookie-parser
app.use(cookieParser());

// json()
app.use(express.json());

app.use("/api/users", userRouter.router);
app.use("/api/tasks", taskRouter.router);

// errorMiddleWare
app.use(errorMiddleWare);

module.exports = app;
