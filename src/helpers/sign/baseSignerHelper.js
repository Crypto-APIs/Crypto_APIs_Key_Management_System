'use strict';

const NetworksConfigsEnum = require('../../enumerations/networksConfigs');

class BaseSigner {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        this.blockchain = blockchain;
        this.network = network;

        if (!NetworksConfigsEnum.hasOwnProperty(this.blockchain)
            || !NetworksConfigsEnum[this.blockchain].hasOwnProperty(this.network)) {
            throw new Error('Unknown configuration for ' + this.blockchain + ':' + this.network);
        }

        this.networkConfig = NetworksConfigsEnum[this.blockchain][this.network];
    }

    /**
     * @param {string} key
     * @param {Object} transaction
     * @param {Object} options
     * @private
     *
     * @return {{id: string, raw: string}}
     */
    sign({key, transaction, options = {}}) {
        throw new Error('Implement sign method for service ' + this.constructor.name);
    };
}

module.exports = BaseSigner;