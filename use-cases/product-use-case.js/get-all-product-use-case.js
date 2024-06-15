module.exports = function makeGetAllProductUseCase({
  productDb,
  channelDb,
  subProductDb,
  CustomError,
}) {
  return async function getAllProductUseCase({
    companyId,
    queryStringObj
  } = {}) {
    try {
      const products = await productDb.getAllProductByCompanyId({companyId,queryStringObj});

      const channel = await channelDb.getChannelByChannelCodeAndCompanyId({channelCode : "en",companyId});

      for (let i = 0; i < products.length; i++) {
        const enSubProduct = await subProductDb.getSubProductByChannelIdAndProductId({channelId : channel["channelId"],productId : products[i]["productId"]});
        products[i]["productName"] = enSubProduct["productName"];
        products[i]["description"] = enSubProduct["description"];
      }
      return products;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
