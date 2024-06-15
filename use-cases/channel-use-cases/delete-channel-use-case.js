
module.exports = function makeDeleteChannelUseCase({ channelDb, CustomError}) {
    return async function deleteChannelUseCase({ channelId,companyId } = {}) {
      try {
        const channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId,companyId});

        if (!channel) {
            throw new CustomError(404,"channel dont exists");
        }
        if (channel["channelCode"] === "en") {
            throw new CustomError(403, "dont allow to delete english channel")
        }
        await channelDb.deleteChannel({channelId,companyId});
        return channel;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };