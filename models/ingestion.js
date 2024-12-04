const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingestionSchema = new Schema({
  status:{ type: String, required: true },
  startTime: { type: String, required: true },
  unique_id: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
});

ingestionSchema.methods.filterRecord = async (condition, projection = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await ingestion.find(condition, projection);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

ingestionSchema.methods.updateRecord = async (condition, newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await ingestion.findOneAndUpdate(condition, newData, { new: true });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const ingestion = mongoose.model("ingestion", ingestionSchema, "ingestion");

module.exports = ingestion;
