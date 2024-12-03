const taskService = require("../services/task");

const addTask = async (req, res) => {
  try {
    const { user_id } = req.headers;
    let task = await taskService.addTask(user_id, req.body);
    res.json(task);
  } catch (e) {
    res.json(e);
  }
};

const getTaskData = async (req, res) => {
  try {
    const user_id = req.header("user_id");
    let taskRecord = await taskService.getTaskData(user_id);
    res.json(taskRecord);
  } catch (e) {
    res.json(e);
  }
};

const updateTask = async (req, res) => {
  try {
    let updateData = await taskService.updateTask(req.params.task_id, req.body);
    res.json(updateData);
  } catch (e) {
    res.json(e);
  }
};

const deleteTask = async (req, res) => {
  try {
    let deleteData = await taskService.deleteTask(req.params.task_id);
    res.json(deleteData);
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  addTask: addTask,
  getTaskData: getTaskData,
  updateTask: updateTask,
  deleteTask: deleteTask,
};
