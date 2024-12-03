const taskModel = require("../models/task.js");
const task = new taskModel();
let errorMessage = require("../common/error_constants.js");
const uuid = require("uuid");

const addTask = async function (user_id, reqBody) {
  try {
    return new Promise(async (resolve, reject) => {
      const newTask = new taskModel();
      newTask.task_id = uuid.v1();
      newTask.title = reqBody.title;
      newTask.description = reqBody.description;
      newTask.status = reqBody.status;
      newTask.user_id = user_id;

      let newRecord = await newTask.save();

      if (newRecord && Object.keys(newRecord).length) {
        let response = {
          status: 200,
          data: { task_id: newRecord.task_id },
          message: `Task create Successfully`,
        };
        resolve(response);
      } else {
        reject(errorMessage.SAVE_FAILED);
      }
    });
  } catch (e) {
    throw e;
  }
};

const getTaskData = async (user_id) => {
  try {
    return new Promise(async (resolve, reject) => {
      let taskData = await task.filterRecord(
        {
          user_id: user_id,
        },
        { _id: 0, task_id: 1, title: 1, description: 1, status: 1 }
      );
      if (taskData && taskData.length) {
        let response = {
          status: 200,
          message: "Record Fetched successfully",
          data: taskData,
        };
        resolve(response);
      } else {
        reject(errorMessage.NO_RECORD);
      }
    });
  } catch (e) {
    throw e;
  }
};

const updateTask = async (task_id, data) => {
  try {
    return new Promise(async (resolve, reject) => {
      let taskData = await task.filterRecord({ task_id: task_id });
      if (taskData && taskData.length) {
        var updatedRecord = await task.updateRecord(
          { task_id: task_id },
          {
            title: data.title,
            description: data.description,
            status: data.status,
          }
        );
        if (updatedRecord && Object.keys(updatedRecord).length) {
          let response = {
            status: 200,
            message: "Task updated successfully",
          };
          resolve(response);
        } else {
          reject(errorMessage.TASK_NOT_UPDATE);
        }
      } else {
        reject(errorMessage.NO_TASK_FOUND);
      }
    });
  } catch (e) {
    throw e;
  }
};

const deleteTask = async (task_id) => {
  try {
    return new Promise(async (resolve, reject) => {
      let taskData = await task.deleteRecord({ task_id: task_id });
      if (taskData && Object.keys(taskData).length) {
        let response = {
          status: 200,
          message: "Task is  delete successfully",
        };
        resolve(response);
      } else {
        reject(errorMessage.NO_TASK_FOUND);
      }
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addTask: addTask,
  getTaskData: getTaskData,
  updateTask: updateTask,
  deleteTask: deleteTask,
};
