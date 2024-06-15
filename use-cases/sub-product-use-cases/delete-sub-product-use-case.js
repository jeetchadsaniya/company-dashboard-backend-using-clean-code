
module.exports = function makeDeleteSubProductUseCase({ subProductDb,channelDb,CustomError}) {
    return async function deleteSubProductUseCase({ subProductId,companyId } = {}) {
      try {

        const subProduct = await subProductDb.getSubProductBySubProductIdAndCompanyId({subProductId,companyId});
        if (!subProduct) {
            throw new CustomError(404,"sub-product dont exists")
        }

        const channel = await channelDb.getChannelByChannelIdAndCompanyId({channelId : subProduct["channelId"],companyId});

        if (channel["channelCode"] === "en") {
            throw new CustomError(403,"you dont delete english sub product");
        }
        await subProductDb.deleteSubProduct({subProductId,companyId});
        return subProduct;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };