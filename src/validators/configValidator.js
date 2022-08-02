'use strict';

const validateBlockchain = require("./blockchainValidator")
    , {NETWORKS: NetworksEnum} = require('../enumerations/networkEnum')
    , errors = require('./customErrors')
    , errorDTO = require('../dtos/errorDTO')
;

module.exports = {

    /**
     * @param {string} apiKey
     * @param {string} blockchain
     * @param {string} network
     * @returns {boolean}
     */
    init: function (apiKey, blockchain, network) {
        if (!apiKey) {
            throw errors.getErrorMessage('API_KEY_NOT_FOUND');
        }

        if (!blockchain) {
            throw errors.getErrorMessage('BLOCKCHAIN_NOT_FOUND');
        }

        if (!network) {
            throw errors.getErrorMessage('NETWORK_NOT_FOUND');
        }

        const error = validateBlockchain(blockchain)
        if (error !== true) {
            throw error;
        }

        const networks = Object.values(NetworksEnum[blockchain]);
        if (!networks.includes(network.toLowerCase())) {
            throw new errorDTO('INVALID_NETWORK', {'networks': networks.join(', ')});
        }

        return true;
    },
}