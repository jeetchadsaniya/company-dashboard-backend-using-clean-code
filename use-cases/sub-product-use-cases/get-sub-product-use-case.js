
module.exports = function makeGetSubProductUseCase({ subProductDb,CustomError}) {
    return async function getSubProductUseCase({ subProductId,companyId } = {}) {
      try {

        const subProduct = await subProductDb.getSubProductBySubProductIdAndCompanyId({subProductId,companyId});
        if (!subProduct) {
            throw new CustomError(404,"sub-product dont exists")
        }

        return subProduct;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };