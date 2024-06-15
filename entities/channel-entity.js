module.exports = function buildMakeChannel({joi, CustomError}) {
    return function makeChannel({channelName, channelCode, companyId} = {}) {
        const schema = joi.object({
            channelName : joi.string().trim().pattern(/^[a-zA-Z]+$/).max(30).required().allow(null),
            channelCode : joi.string().trim().pattern(/^[a-z]+$/).max(30).required().allow(null),
            companyId : joi.number().integer().required().allow(null),
        })

        const {value , error} = schema.validate({
             channelName, channelCode, companyId
        });

        if (error) {
            throw new CustomError(400,error.message)
        }

        return Object.freeze({
            getChannelName : () => value.channelName,
            getChannelCode : () => value.channelCode,
            getCompanyId : () => value.companyId,
        })
    }
}