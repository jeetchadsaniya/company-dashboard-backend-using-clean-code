const {makeSubProduct} = require("../../entities")

module.exports = function makeUpdateSubProductUseCase({ subProductDb,CustomError}) {
    return async function updateSubProductUseCase({ productName, description, subProductId,companyId } = {}) {
      try {
        //validation
        makeSubProduct({productName, description, productId : null, channelId : null, companyId});

        let subProduct = await subProductDb.getSubProductBySubProductIdAndCompanyId({subProductId,companyId});
        if (!subProduct) {
            throw new CustomError(404,"sub-product dont exists")
        }

        subProduct = await subProductDb.getSubProductByProductNameAndCompanyId({productName,companyId});

        if (subProduct) {
            throw new CustomError(400,"sub-product exists in your company with same ProductName");
        }
        await subProductDb.updateSubProduct({productName,description,subProductId });

        subProduct = await subProductDb.getSubProductBySubProductIdAndCompanyId({subProductId,companyId});

        return subProduct;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };