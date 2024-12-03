const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  user_role:{ type: String, required: true },
  password: { type: String, required: true },
  unique_id: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

userSchema.methods.filterRecord = async (condition, projection = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await user.find(condition, projection);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};


userSchema.methods.updateRecord = async (condition, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await user.findOneAndUpdate(condition, newData, { new: true });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

userSchema.methods.deleteRecord = async (condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await user.findOneAndDelete(condition);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const user = mongoose.model("user", userSchema, "user");

module.exports = user;
