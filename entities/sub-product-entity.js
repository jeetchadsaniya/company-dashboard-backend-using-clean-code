module.exports = function buildMakeSubProduct({ joi, CustomError }) {
  return function makeSubProduct({
    productName,
    description,
    productId,
    channelId,
    companyId,
  } = {}) {
    const schema = joi.object({
      productName: joi.string().trim().pattern(/^[a-zA-Z\s]+$/).max(30).required().allow(null),
      description: joi.string().trim().pattern(/^[a-zA-Z\s]+$/).max(100).required().allow(null),
      productId: joi.number().integer().required().allow(null),
      channelId: joi.number().integer().required().allow(null),
      companyId: joi.number().integer().required().allow(null),
    });

    const { value, error } = schema.validate({
      productName,
      description,
      productId,
      channelId,
      companyId,
    });

    if (error) {
      throw new CustomError(400,error.message)
    }

    return Object.freeze({
      getProdcutName: () => value.productName,
      getDescription: () => value.description,
      getProductId: () => value.productId,
      getChannelId: () => value.channelId,
      getCompanyId: () => value.companyId,
    });
  };
};
