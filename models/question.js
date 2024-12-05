const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  answer:{ type: String, required: true },
  question: { type: String, required: true },
  unique_id: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

questionSchema.methods.filterRecord = async (condition, projection = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await question.find(condition, projection);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const question = mongoose.model("question", questionSchema, "question");

module.exports = question;
