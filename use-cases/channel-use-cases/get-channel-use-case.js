
module.exports = function makeGetChannelUseCase({ channelDb, CustomError}) {
    return async function getChannelUseCase({ channelId,companyId } = {}) {
      try {
        const channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId,companyId});

        if (!channel) {
            throw new CustomError(404,"channel dont exists");
        }
        return channel;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };