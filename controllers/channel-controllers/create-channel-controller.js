module.exports = function makeCreateChannelController({createChannelUseCase, sendResponseObj}) {
    return async function createChannelController(req, res) {
      try {
        const { channelName,channelCode }= req.body;
        const data = await createChannelUseCase({ channelName,channelCode,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 201,message : "channel created successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  