module.exports = function makeDeleteProductUseCase({
    productDb,
    CustomError,
  }) {
    return async function deleteProductUseCase({ companyId, productId } = {}) {
      try {
        const product = await productDb.getProductByProductIdAndCompanyId({
          productId,
          companyId,
        });

        if (!product) {
          throw new CustomError(404,"product not exist in your company");
        }
  
        await productDb.deleteProduct({productId,companyId});
        return product;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };
  