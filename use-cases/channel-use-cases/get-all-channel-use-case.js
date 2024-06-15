
module.exports = function makeGetAllChannelUseCase({ channelDb, CustomError}) {
    return async function getAllChannelUseCase({ companyId,queryStringObj } = {}) {
      try {
        const channels = await channelDb.getAllChannelByCompanyId({companyId,queryStringObj});
        return channels;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };