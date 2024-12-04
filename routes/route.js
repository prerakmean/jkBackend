const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const TaskController = require("../controllers/task");
const IngestionController = require("../controllers/ingestion");
const common = require("../common/verifyToken");

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.get("/api/getTask", common.verifyToken, TaskController.getTaskData);
router.get("/api/getUser", common.verifyToken, userController.getUserData);
router.post("/api/addTask", common.verifyToken, TaskController.addTask);
router.put("/api/updateUser/:id",common.verifyToken,userController.updateUser);
router.delete("/api/deleteUser/:id",common.verifyToken,userController.deleteUser);
router.get("/api/getIngestion", common.verifyToken, IngestionController.getIngestion);
router.post("/api/addIngestion", common.verifyToken, IngestionController.addIngestion);
module.exports = router;
