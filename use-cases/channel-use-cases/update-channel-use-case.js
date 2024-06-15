const { makeChannel } = require("../../entities");

module.exports = function makeUpdateChannelUseCase({ channelDb, CustomError}) {
    return async function updateChannelUseCase({ channelId,channelName,channelCode,companyId } = {}) {
      try {
        //validation
        makeChannel({ channelName,channelCode,companyId });

        //check channel exist or not
        let channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId,companyId});

        if (!channel) {
            throw new CustomError(404,"channel dont exists");
        }
        //dont allow to change en channel
        if (channel["channelCode"] === "en") {
            throw new CustomError(403,"dont allow to change english channel")
        }

        //check channel exist with same code
        channel = await channelDb.getChannelByChannelCodeAndCompanyId({channelCode,companyId});

        if (channel) {
          throw new CustomError(400,"Channel already exists with same channel code in your company")
        }

        channel = await channelDb.getChannelByChannelNameAndCompanyId({channelName,companyId});

        if (channel) {
          throw new CustomError(400,"Channel already exists with same channel Name in your company")
        }

        await channelDb.updateChannel({channelCode,channelName,channelId});

        channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId,companyId});
        return channel;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };