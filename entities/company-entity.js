module.exports = function buildMakeCompany({joi, CustomError}) {
    return function makeCompany({ companyName, email} = {}) {
        const schema = joi.object({
            companyName : joi.string().trim().pattern(/^[a-zA-Z]+$/).max(30).required().allow(null),
            email : joi.string().email().max(30).required().allow(null),
        })

        const {value , error} = schema.validate({
             companyName, email
        });

        if (error) {
            throw new CustomError(400,error.message)
        }

        return Object.freeze({
            getCompanyName : () => value.companyName,
            getEmail : () => value.email,
        })
    }
}