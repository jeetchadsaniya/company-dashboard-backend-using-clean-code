const { makeChannel } = require("../../entities");

module.exports = function makeCreateChannelUseCase({ channelDb, CustomError}) {
    return async function createChannelUseCase({ channelName,channelCode,companyId } = {}) {
      try {
        //validation
        makeChannel({ channelName,channelCode,companyId });

        //check channel exist with same code
        let channel = await channelDb.getChannelByChannelCodeAndCompanyId({channelCode,companyId});

        if (channel) {
          throw new CustomError(400,"Channel already exists with same channel code in your company")
        }

        channel = await channelDb.getChannelByChannelNameAndCompanyId({channelName,companyId});

        if (channel) {
          throw new CustomError(400,"Channel already exists with same channel Name in your company")
        }

        const insertedChannelId = await channelDb.insertChannel({channelCode,channelName,companyId});
        
        return {insertedChannelId};
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };