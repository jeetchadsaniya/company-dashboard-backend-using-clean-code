const { channelUseCase } = require("../../use-cases");

const makeCreateChannelController = require("./create-channel-controller")
const makeDeleteChannelController = require("./delete-channel-controller")
const makeGetAllChannelController = require("./get-all-channel-controller")
const makeGetChannelController = require("./get-channel-controller")
const makeUpdateChannelController = require("./update-channel-controller")

const sendResponseObj = require("../../utils/send-response-function")

const createChannelController = makeCreateChannelController({createChannelUseCase : channelUseCase.createChannelUseCase, sendResponseObj});
const deleteChannelController = makeDeleteChannelController({deleteChannelUseCase : channelUseCase.deleteChannelUseCase, sendResponseObj});
const getAllChannelController = makeGetAllChannelController({getAllChannelUseCase : channelUseCase.getAllChannelUseCase, sendResponseObj});
const getChannelController = makeGetChannelController({getChannelUseCase : channelUseCase.getChannelUseCase, sendResponseObj});
const updateChannelController = makeUpdateChannelController({updateChannelUseCase : channelUseCase.updateChannelUseCase, sendResponseObj});


module.exports = Object.freeze({
    createChannelController,
    deleteChannelController,
    getAllChannelController,
    getChannelController,
    updateChannelController
})