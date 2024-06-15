module.exports = function buildMakeRollObj({ joi, CustomError }) {
  return function makeRollObj(roll) {
    const schema = joi
      .object({
        channelPermission: joi
          .object({
            read: joi.number().integer().required().min(0).max(1),
            write: joi.number().integer().required().min(0).max(1),
            delete: joi.number().integer().required().min(0).max(1),
          })
          .required(),
        userPermission: joi
          .object({
            read: joi.number().integer().required().min(0).max(1),
            write: joi.number().integer().required().min(0).max(1),
            delete: joi.number().integer().required().min(0).max(1),
          })
          .required(),
        productPermission: joi
          .object({
            read: joi.number().integer().required().min(0).max(1),
            write: joi.number().integer().required().min(0).max(1),
            delete: joi.number().integer().required().min(0).max(1),
          })
          .required(),
      })
      .required()
      .label("roll");

    const { value, error } = schema.validate(roll);

    if (error) {
      throw new CustomError(400,error.message)
    }

    return Object.freeze(roll);
  };
};
