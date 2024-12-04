
const ingestionService = require("../services/ingestion");

const getIngestion = async (req, res) => {
    try {
      const user_id = req.header("user_id");
      let list = await ingestionService.getIngestionData(user_id);
      res.json(list);
    } catch (e) {
      res.json(e);
    }
  };

  const addIngestion = async (req, res) => {
    try {
      const user_id = req.header("user_id");
      let data = await ingestionService.addIngestion(user_id,req.body);
      res.json(data);
    } catch (e) {
      res.json(e);
    }
  };


  module.exports ={
    getIngestion:getIngestion,
    addIngestion:addIngestion
  }