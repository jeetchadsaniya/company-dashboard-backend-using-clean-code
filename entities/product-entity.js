module.exports = function buildMakeProduct({ joi, CustomError }) {
  return function makeProduct({
    price,
    companyId,
    imageUrl,
  } = {}) {
    const schema = joi.object({
      price: joi.number().integer().min(0).required().allow(null),
      companyId: joi.number().integer().required().allow(null),
      imageUrl: joi.string().max(150).required().allow(null),
    });

    const { value, error } = schema.validate({
      price,
      companyId,
      imageUrl,
    });

    if (error) {
      throw new CustomError(400,error.message)
    }

    return Object.freeze({
      getPrice: () => value.price,
      getCompanyId: () => value.companyId,
      getImageUrl: () => value.imageUrl,
    });
  };
};
