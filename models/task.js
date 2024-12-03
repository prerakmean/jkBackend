const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  user_id: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

taskSchema.methods.filterRecord = async (condition, projection = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await task.find(condition, projection);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

taskSchema.methods.updateRecord = async (condition, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await task.findOneAndUpdate(condition, newData, { new: true });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

taskSchema.methods.deleteRecord = async (condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await task.findOneAndDelete(condition);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const task = mongoose.model("task", taskSchema, "task");
module.exports = task;
