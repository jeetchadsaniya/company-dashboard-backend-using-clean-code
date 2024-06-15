const { makeUser } = require("../../entities");

module.exports = function makeSendForgotPasswordMailUseCase({ companyDb,userDb, sendForgotPasswordMail,jwt,CustomError}) {
    return async function sendForgotPasswordMailUseCase({ companyId, email }= {}) {
      try {
        //validation
      makeUser({
        companyId,
        userName: null,
        email,
        password : null,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet : null
      });

      const company = await companyDb.getCompanyByCompanyId({ companyId });

      if (!company) {
        throw new CustomError(404, "Company Dont exists");
      }

      const user = await userDb.getUserByEmailAndCompanyId({
        companyId,
        email,
      });

      if (!user) {
        throw new CustomError(404, "User Dont exists");
      }

      await userDb.changeIsPasswordSet({isPasswordSet : 0 , userId : user["userId"]});

      const accessToken = jwt.sign({userId : user["userId"]},process.env.JWT_SECRET,{ expiresIn: "10m" });

      await sendForgotPasswordMail({accessToken,email});

      return {accessToken};
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };