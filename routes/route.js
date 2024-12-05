const express = require("express");
const router = express.Router();
const common = require("../common/verifyToken");
const userController = require("../controllers/users");
const IngestionController = require("../controllers/ingestion");
const QuestionController =require("../controllers/question");

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.get("/api/getUser", common.verifyToken, userController.getUserData);
router.put("/api/updateUser/:id",common.verifyToken,userController.updateUser);
router.delete("/api/deleteUser/:id",common.verifyToken,userController.deleteUser);
router.get("/api/getIngestion", common.verifyToken, IngestionController.getIngestion);
router.post("/api/addIngestion", common.verifyToken, IngestionController.addIngestion);
router.post("/api/askQuestion", common.verifyToken, QuestionController.getAnswer);
router.post("/api/addQuestionWithAnswer", QuestionController.addQuestionWithAnswer);

module.exports = router;
