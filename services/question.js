const userModel = require("../models/users");
const user = new userModel();
const questionModel = require("../models/question.js");
const question = new questionModel();
let errorMessage = require("../common/error_constants.js");
const uuid = require("uuid");

const getAnswer = async (user_id,reqBody) => {
    try {
        return new Promise(async (resolve, reject) => {
            let userExist = await user.filterRecord({ unique_id: user_id, user_role: 2 });
            if (userExist && userExist.length) {
                let questionData = await question.filterRecord({ question : { '$regex' : reqBody.question }  },
                    { _id: 0, answer: 1, question: 1, unique_id: 1 }
                );
                if (questionData && questionData.length) {
                    let response = {
                        status: 200,
                        message: "Records Fetched successfully",
                        data: questionData,
                    };
                    resolve(response);
                } else {
                    reject(errorMessage.NO_RECORD);
                }
            } else {
                reject(errorMessage.UNAUTHORIZED);
            }


        });
    } catch (e) {
        throw e;
    }
};


const addQuestionWithAnswer = async function (user_id,reqBody) {
    try {
        return new Promise(async (resolve, reject) => {
                let question = new questionModel();
                question.question = reqBody.question;
                question.unique_id = uuid.v1();
                question.answer = reqBody.answer;

                let newRecord = await question.save();

                if (newRecord && Object.keys(newRecord).length) {
                    let response = {
                        status: 200,
                        message: `Add Question And Answer Successfully`,
                    };
                    resolve(response);
                } else {
                    reject(errorMessage.QUESTION_SAVE_FAILED);
                }

        });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getAnswer: getAnswer,
    addQuestionWithAnswer: addQuestionWithAnswer
}