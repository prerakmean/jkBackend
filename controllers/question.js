
const questionService = require("../services/question");

const getAnswer = async (req, res) => {
    try {
        const user_id = req.header("user_id");
        let list = await questionService.getAnswer(user_id, req.body);
        res.json(list);
    } catch (e) {
        res.json(e);
    }
};

const addQuestionWithAnswer = async (req, res) => {
    try {
        const user_id = req.header("user_id");
        let data = await questionService.addQuestionWithAnswer(user_id, req.body);
        res.json(data);
    } catch (e) {
        res.json(e);
    }
};


module.exports = {
    getAnswer: getAnswer,
    addQuestionWithAnswer: addQuestionWithAnswer
}