module.exports = function makeDeleteChannelController({deleteChannelUseCase, sendResponseObj}) {
    return async function deleteChannelController(req, res) {
      try {
        const data = await deleteChannelUseCase({ channelId : req.params.id,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "delete channel successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  