'use strict';

/**
 * Abstract Class BaseBlockchainAwareService
 *
 * @class BaseBlockchainAwareService
 */
class BaseBlockchainAwareService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        if (this.constructor === BaseBlockchainAwareService) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this._blockchain = blockchain;
        this._network = network;
    }
}

/**
 * Abstract Class BaseCryptoAPIsLibAwareService
 *
 * @class BaseCryptoAPIsLibAwareService
 * @extends {BaseBlockchainAwareService}
 */
class BaseCryptoAPIsLibAwareService extends BaseBlockchainAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(blockchain, network)

        if (this.constructor === BaseCryptoAPIsLibAwareService) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this._cryptoApis = cryptoApis;
    }
}

module.exports = {
    BaseBlockchainAwareService,
    BaseCryptoAPIsLibAwareService
};