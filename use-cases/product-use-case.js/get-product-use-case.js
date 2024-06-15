module.exports = function makeGetProductUseCase({
  productDb,
  channelDb,
  subProductDb,
  CustomError,
}) {
  return async function getProductUseCase({ companyId, productId } = {}) {
    try {
      const product = await productDb.getProductByProductIdAndCompanyId({
        productId,
        companyId,
      });

      if (!product) {
        throw new CustomError(404, "product dont exists");
      }
      const channel = await channelDb.getChannelByChannelCodeAndCompanyId({
        channelCode: "en",
        companyId,
      });
      
      const enSubProduct =
        await subProductDb.getSubProductByChannelIdAndProductId({
          channelId: channel["channelId"],
          productId,
        });
      product["productName"] = enSubProduct["productName"];
      product["description"] = enSubProduct["description"];
      return product;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
