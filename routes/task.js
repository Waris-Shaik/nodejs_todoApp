const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/new", isAuthenticated, taskController.newTask);
router.get("/my", isAuthenticated, taskController.getMyTasks);
router
  .route("/:id")
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

exports.router = router;
