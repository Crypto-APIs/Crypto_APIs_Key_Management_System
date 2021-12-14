'use strict';

const validateBlockchain = require("./blockchainValidator")
    , {NETWORKS: NetworksEnum} = require('../enumerations/networks');

module.exports = {

    /**
     * @param {object} config
     * @returns {boolean}
     */
    init: function (config) {
        if (!config.apiKey) {
            throw 'error: please provide API KEY';
        }

        validateBlockchain(config.blockchain);

        const networks = Object.values(NetworksEnum[config.blockchain]);
        if (!networks.includes(config.network.toLowerCase())) {
            throw 'error: please provide one of the following values: ' + networks.join(',');
        }

        return true;
    },
}