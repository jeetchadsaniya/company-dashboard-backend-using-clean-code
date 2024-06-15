const CustomError = require("../../utils/custom-error");

const makeCreateChannelUseCase = require("./create-channel-use-case")
const makeDeleteChannelUseCase = require("./delete-channel-use-case")
const makeGetAllChannelUseCase = require("./get-all-channel-use-case")
const makeGetChannelUseCase = require("./get-channel-use-case")
const makeUpdateChannelUseCase = require("./update-channel-use-case")

const {channelDb} = require("../../data-access")

const createChannelUseCase = makeCreateChannelUseCase({ channelDb, CustomError});
const deleteChannelUseCase = makeDeleteChannelUseCase({ channelDb, CustomError});
const getAllChannelUseCase = makeGetAllChannelUseCase({ channelDb, CustomError});
const getChannelUseCase = makeGetChannelUseCase({ channelDb, CustomError});
const updateChannelUseCase = makeUpdateChannelUseCase({ channelDb, CustomError});

module.exports = Object.freeze({
    createChannelUseCase,
    deleteChannelUseCase,
    getAllChannelUseCase,
    getChannelUseCase,
    updateChannelUseCase
})