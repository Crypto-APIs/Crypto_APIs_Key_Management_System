'use strict';

const NetworksConfigsEnum = require('../../enumerations/networks');

class BaseSigner {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        this.blockchain = blockchain;
        this.network = network;

        if (!NetworksConfigsEnum.NETWORKS_CONFIGS.hasOwnProperty(this.blockchain)
            || !Object.keys(NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain].hasOwnProperty(this.network))) {
            throw new Error('Unknown configuration for ' + this.blockchain + ':' + this.network);
        }

        this.networkConfig = NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain][this.network];
    }

    /**
     * @param {string} xPriv account extended xPriv
     * @param {TransactionDTO} transaction
     * @protected
     * @return {SignDTO}
     */
    sign({xPriv, transaction}) {
        throw new Error('Implement sign method for service ' + this.constructor.name);
    };
}

module.exports = BaseSigner;