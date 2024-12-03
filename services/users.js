const userModel = require("../models/users");
const user = new userModel();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let errorMessage = require("../common/error_constants.js");
const uuid = require("uuid");

const login = async function (reqBody) {
  try {
    return new Promise(async (resolve, reject) => {
      let userRecord = await user.filterRecord({ email: reqBody.email });

      if (userRecord && userRecord.length) {
        let passwordIsValid = bcrypt.compareSync(
          reqBody.password,
          userRecord[0].password
        );
        if (passwordIsValid) {
          let token = jwt.sign(
            { email: userRecord[0].email, userId: userRecord[0]._id },
            "AUTH_KEY"
          );
          let response = {
            status: 200,
            message: "User logged in Successfully",
            token: token,
            data: {
              username: userRecord[0].username,
              email: userRecord[0].email,
              unique_id: userRecord[0].unique_id,
              user_role:userRecord[0].user_role
            },
          };
          resolve(response);
        } else {
          reject(errorMessage.WRONG_PASS);
        }
      } else {
        reject(errorMessage.EMAIL_NOT_FOUND);
      }
    });
  } catch (e) {
    throw e;
  }
};

const signup = async function (reqBody) {
  try {
    return new Promise(async (resolve, reject) => {
      let userExist = await user.filterRecord({ email: reqBody.email });
      if (userExist && userExist.length) {
        let errMeassge = {
          status: 400,
          message: `User with email - ${reqBody.email} already exists. Please choose another one`,
        };
        reject(errMeassge);
      } else {
        let newUser = new userModel();
        newUser.username = reqBody.username;
        newUser.email = reqBody.email;
        newUser.password = await bcrypt.hashSync(reqBody.password, 8);
        newUser.unique_id = uuid.v1();
        newUser.user_role = 2 ;
        if(reqBody.email == 'admin@gmail.com'){
          newUser.user_role = 1 ;
        }
       
        let newRecord = await newUser.save();

        if (newRecord && Object.keys(newRecord).length) {
          let response = {
            status: 200,
            message: `User create Successfully`,
          };
          resolve(response);
        } else {
          reject(errorMessage.USER_SAVE_FAILED);
        }
      }
    });
  } catch (e) {
    throw e;
  }
};


const getUserData = async (user_id) => {
  try {
    return new Promise(async (resolve, reject) => {
      let userExist = await user.filterRecord({ unique_id: user_id , user_role:1 });
      if (userExist && userExist.length) {
        let userData = await user.filterRecord({ user_role: { $ne: '1' }},
          { _id: 0, username: 1, email: 1, user_role: 1, unique_id: 1 }
        );

        if (userData && userData.length) {
          let response = {
            status: 200,
            message: "Records Fetched successfully",
            data: userData,
          };
          resolve(response);
        } else {
          reject(errorMessage.NO_RECORD);
        }
      }else{
        reject(errorMessage.UNAUTHORIZED);
      }

 
    });
  } catch (e) {
    throw e;
  }
};

const updateUser = async (id,user_id, data) => {
  try {
    return new Promise(async (resolve, reject) => {
      let userData = await user.filterRecord({ unique_id: user_id,user_role:1 });
      if (userData && userData.length) {
        var updatedRecord = await user.updateRecord(
          { unique_id: id },
          {
            user_role: data.user_role,
          }
        );
        if (updatedRecord && Object.keys(updatedRecord).length) {
          let response = {
            status: 200,
            message: "User updated successfully",
          };
          resolve(response);
        } else {
          reject(errorMessage.USER_NOT_UPDATE);
        }
      } else {
        reject(errorMessage.UNAUTHORIZED);
      }
    });
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (id,user_id,) => {
  try {
    return new Promise(async (resolve, reject) => {
      let userData = await user.filterRecord({ unique_id: user_id,user_role:1 });
      if (userData && userData.length) {
      let userData = await user.deleteRecord({ unique_id: id });
      if (userData && Object.keys(userData).length) {
        let response = {
          status: 200,
          message: "User is  delete successfully",
        };
        resolve(response);
      } else {
        reject(errorMessage.NO_USER_FOUND);
      }
    }else{
      reject(errorMessage.UNAUTHORIZED);
    }
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  login: login,
  signup: signup,
  getUserData:getUserData,
  updateUser:updateUser,
  deleteUser:deleteUser
};
