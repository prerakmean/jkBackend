const userService = require("../services/users");

const signup = async (req, res) => {
  try {
    let user = await userService.signup(req.body);
    res.json(user);
  } catch (e) {
    res.json(e);
  }
};

const login = async (req, res) => {
  try {
    let userRecord = await userService.login(req.body);
    res.json(userRecord);
  } catch (e) {
    res.json(e);
  }
};
const getUserData = async (req, res) => {
  try {
    const user_id = req.header("user_id");
    let userRecord = await userService.getUserData(user_id);
    res.json(userRecord);
  } catch (e) {
    res.json(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.header("user_id");
    let updateData = await userService.updateUser(req.params.id,user_id, req.body);
    res.json(updateData);
  } catch (e) {
    res.json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.header("user_id");
    let deleteData = await userService.deleteUser(req.params.id,user_id);
    res.json(deleteData);
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  signup: signup,
  login: login,
  getUserData:getUserData,
  updateUser:updateUser,
  deleteUser:deleteUser
};
