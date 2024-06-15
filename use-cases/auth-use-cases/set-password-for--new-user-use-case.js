const { makeUser } = require("../../entities");

module.exports = function makeSetPasswordForNewUserUseCase({ userDb, bcrypt,jwt,CustomError}) {
    return async function setPasswordForNewUserUseCase({ accessToken,password }= {}) {
      try {
        //validation
      makeUser({
        companyId : null,
        userName: null,
        email : null,
        password : password,
        status: null,
        createdBy: null,
        rollId: null,
        isPasswordSet : null
      });

      let decode;
      try {
        decode = jwt.verify(accessToken, process.env.JWT_SECRET);
      } catch (error) {
        throw new CustomError(401,"enter valid jwt token")
      }

      const userId = decode.userId;

      const user = await userDb.getUserByUserId({userId});

      if (!user) {
        throw new CustomError(404, "User Dont exists");
      }

      if (user["isPasswordSet"]) {
        throw new CustomError(400,"You Already Set Password");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await userDb.setPassword({ password : hashPassword, isPasswordSet : 1,userId });
      await userDb.updateStatus({ status : 'active' ,userId });

      user["status"] = 'active';
      user["password"] = hashPassword;
      user["isPasswordSet"] = 1;
      return user;
      } catch (error) {
        throw new CustomError(error.errorCode, error.message);
      }
    };
  };