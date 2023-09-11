const { ErrorHandler } = require("../middlewares/error");
const model = require("../models/task");
const Task = model.Task;

exports.newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task added successfully...",
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task Not Found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully...",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.log("no it doesnot have");
      return next(new ErrorHandler());
    }
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully...",
    });
  } catch (error) {
    next(error);
  }
};
