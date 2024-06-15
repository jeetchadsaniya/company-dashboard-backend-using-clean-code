const { makeProduct } = require("../../entities");

module.exports = function makeUpdateProductUseCase({
  productDb,
  uploadImageAndSendImageUrl,
  CustomError,
}) {
  return async function updateProductUseCase({
    fields,
    files,
    productId,
    companyId,
  } = {}) {
    try {
      //validation
      if (!Object.keys(fields).includes("price")) {
        throw new CustomError(400, "price required");
      }
      const price = fields["price"][0];

      makeProduct({ price, companyId: companyId, imageUrl: null });


      let product = await productDb.getProductByProductIdAndCompanyId({productId,companyId});

      if (!product) {
        throw new CustomError(404, "product dont exists");
      }

      let file ;
      if (Object.keys(files).includes("image")) {
        file = files["image"][0];
        if (!file.mimetype.startsWith("image/")) {
            throw new CustomError(400, "accept only image file");
          }
          product["imageUrl"] = await uploadImageAndSendImageUrl({file});
      }
      await productDb.updateProduct({imageUrl : product["imageUrl"], price, productId});

      product = await productDb.getProductByProductIdAndCompanyId({productId,companyId});
      return product;
    } catch (error) {
      throw new CustomError(error.errorCode, error.message);
    }
  };
};
