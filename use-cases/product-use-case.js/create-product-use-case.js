const { makeProduct, makeSubProduct } = require("../../entities");

module.exports = function makeCreateProductUseCase({
  productDb,
  subProductDb,
  channelDb,
  uploadImageAndSendImageUrl,
  CustomError,
}) {
  return async function createProductUseCase({
    fields,
    files,
    companyId,
  } = {}) {
    try {
      //validation
      if (
        !Object.keys(fields).includes("productName") ||
        !Object.keys(fields).includes("price") ||
        !Object.keys(fields).includes("description")
      ) {
        throw new CustomError(
          400,
          "productName, price, description key required"
        );
      }
      if (!Object.keys(files).includes("image")) {
        throw new CustomError(400, "image is required");
      }

      const productName = fields["productName"][0];
      const price = fields["price"][0];
      const description = fields["description"][0];

      const file = files["image"][0];

      if (!file.mimetype.startsWith("image/")) {
        throw new CustomError(400, "accept only image file");
      }

      makeProduct({ price, companyId: null, imageUrl: null });
      makeSubProduct({
        productName,
        description,
        productId: null,
        channelId: null,
        companyId,
      });

      //check product already exist with same name or not

      const product = await subProductDb.getSubProductByProductNameAndCompanyId({productName,companyId});

      if (product) {
        throw new CustomError(400,"productName already exist in your company");
      }
      
     const imageUrl =  await uploadImageAndSendImageUrl({file});

     const insertedProductId = await productDb.insertProduct({imageUrl,price,companyId});

     const channel = await channelDb.getChannelByChannelCodeAndCompanyId({channelCode : "en" , companyId});

     const insertedSubProductId = await subProductDb.insertSubProduct({ productName, description,productId : insertedProductId, channelId : channel["channelId"],companyId });

     return {productId : insertedProductId, subProductDbId : insertedSubProductId};
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
