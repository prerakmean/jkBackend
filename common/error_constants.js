module.exports = {
  INVALID_JSON_ERR: { status: 400, message: "Invalid JSON error" },
  METHOD_NOT_ALLOWED: {
    status: 405,
    message: "The method specified in the request is not allowed.",
  },
  INVALID_USER_ACCESS: { message: "Please Provide Correct Information" },
  INVALID_TOKEN: { status: 401, message: "Invalid Token" },
  USER_ALREADY_EXIST: { status: 403, message: "User Already Exists!" },
  USER_NOT_UPDATE: { status: 403, message: "User Not Update!" },
  NO_USER_FOUND: { status: 403, message: "No user Found For User ID" },
  USER_NOT_EXIST: { status: 403, message: "User Does not Exist!" },
  NO_RECORD: { status: 403, message: "No record found" },
  IN_VALID_CREDENTIALS: {
    status: 404,
    message: "Invalid combination of email and password",
  },
  WRONG_PASS: { status: 401, message: "Your password does not match" },
  UNAUTHORIZED: { status: 401, message: "You are not authorized" },
  EMAIL_NOT_FOUND: {
    status: 403,
    message: "No user was found for the given email address",
  },
  USER_SAVE_FAILED: {
    Save: "Failed",
    status: 400,
    message: "Something went wrong while adding a new User",
  },
  SAVE_FAILED: {
    Save: "Failed",
    status: 400,
    message: "Something went wrong while adding a new task",
  },
  INGESTION_SAVE_FAILED: {
    Save: "Failed",
    status: 400,
    message: "Something went wrong while adding a Ingestion",
  },
  QUESTION_SAVE_FAILED: {
    Save: "Failed",
    status: 400,
    message: "Something went wrong while adding a Question",
  },

};
