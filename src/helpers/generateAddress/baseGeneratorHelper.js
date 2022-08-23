'use strict';

const NetworksConfigsEnum = require('../../enumerations/networkEnum')
    , {BaseBlockchainAwareService} = require("../../services/baseServices")
;


/**
 * BaseGeneratorHelper
 *
 * @class BaseGeneratorHelper
 * @extends {BaseBlockchainAwareService}
 */
class BaseGeneratorHelper extends BaseBlockchainAwareService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        super(blockchain, network)

        if (!NetworksConfigsEnum.NETWORKS_CONFIGS.hasOwnProperty(this.blockchain)
            || !Object.keys(NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain].hasOwnProperty(this.network))) {
            throw new Error('Unknown configuration for ' + this.blockchain + ':' + this.network);
        }

        this.networkConfig = NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain][this.network];
    }

    /**
     *
     * @return {AddressDTO}
     */
    generateAddress() {
        return this.generateAddressFromPublicKey()
    }


    /**
     * @protected
     *
     * @returns {AddressDTO}
     */
    generateAddressFromPublicKey() {
        throw new Error('Implement generateAddressFromPublicKey method for service ' + this.constructor.name);
    }
}

module.exports = BaseGeneratorHelper;