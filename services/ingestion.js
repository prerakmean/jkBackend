const userModel = require("../models/users");
const user = new userModel();
const ingestionModel = require("../models/ingestion.js");
const ingestion = new ingestionModel();
let errorMessage = require("../common/error_constants.js");
const uuid = require("uuid");


const getIngestionData = async (user_id) => {
    try {
        return new Promise(async (resolve, reject) => {
            let userExist = await user.filterRecord({ unique_id: user_id, user_role: 3 });
            if (userExist && userExist.length) {
                let ingestionData = await ingestion.filterRecord({},
                    { _id: 0, status: 1, startTime: 1, unique_id: 1 }
                );
                if (ingestionData && ingestionData.length) {
                    let response = {
                        status: 200,
                        message: "Records Fetched successfully",
                        data: ingestionData,
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


const addIngestion = async function (user_id, reqBody) {
    try {
        return new Promise(async (resolve, reject) => {
            let userExist = await user.filterRecord({ unique_id: user_id, user_role: 3 });
            if (userExist && userExist.length) {
                let ingestion = new ingestionModel();
                ingestion.startTime = new Date();;
                ingestion.unique_id = uuid.v1();
                ingestion.status = 'In Progress';

                let newRecord = await ingestion.save();

                if (newRecord && Object.keys(newRecord).length) {
                    setTimeout(() => {
                        // const index = ingestionStatus.findIndex((i) => i.id === ingestionId);
                        // if (index !== -1) ingestionStatus[index].status = 'Completed';
                        ingestion.updateRecord(
                            { unique_id: ingestion.unique_id },
                            {
                                status: 'Completed',
                            }
                          );
                    }, 10000); 
                    let response = {
                        status: 200,
                        message: `Ingestion started`,
                        id:ingestion.unique_id
                    };
                    resolve(response);
                } else {
                    reject(errorMessage.INGESTION_SAVE_FAILED);
                }
            } else {
                reject(errorMessage.UNAUTHORIZED);
            }
        });
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getIngestionData: getIngestionData,
    addIngestion: addIngestion
}