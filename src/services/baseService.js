'use strict';

/**
 * Abstract Class Base.
 *
 * @class BaseService
 */
class BaseService {
    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        if (this.constructor === BaseService) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this._cryptoApis = cryptoApis;
        this.blockchain = blockchain;
        this.network = network;
    }
}

module.exports = BaseService;