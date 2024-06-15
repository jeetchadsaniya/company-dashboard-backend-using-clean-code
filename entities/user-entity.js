module.exports = function buildMakeUser({ joi, CustomError }) {
  return function makeUser({
    companyId,
    userName,
    email,
    password,
    status,
    createdBy,
    rollId,
    isPasswordSet
  } = {}) {
    const schema = joi.object({
      companyId: joi.number().integer().required().allow(null),
      userName: joi.string().trim().pattern(/^[a-zA-Z]+$/).max(30).required().allow(null),
      email: joi.string().email().max(30).required().allow(null),
      password: joi.string().trim().min(5).max(100).required().allow(null),
      status: joi
        .string()
        .max(10)
        .required()
        .allow(null, "invited", "active", "blocked"),
      createdBy: joi.number().integer().required().allow(null),
      rollId: joi.number().integer().required().allow(null),
      isPasswordSet : joi.number().integer().required().min(0).max(1).allow(null),
    });

    const { value, error } = schema.validate({
      companyId,
      userName,
      email,
      password,
      status,
      createdBy,
      rollId,
      isPasswordSet
    });

    if (error) {
      throw new CustomError(400,error.message)
    }

    return Object.freeze({
      getCompanyId: () => value.companyId,
      getUserName: () => value.userName,
      getEmail: () => value.email,
      getPassword: () => value.password,
      getStatus: () => value.status,
      getCreatedBy: () => value.createdBy,
      getRollId: () => value.rollId,
      getIsPasswordSet: () => value.isPasswordSet,
    });
  };
};
