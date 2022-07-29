'use strict';


const BasePrepareTransaction = require("./basePrepareHelper");

/**
 * UTXObasedPrepareTransaction
 *
 * @class UTXObasedPrepareTransaction
 * @extends {BasePrepareTransaction}
 */
class UTXObasedPrepareTransaction extends BasePrepareTransaction {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
    }

    /**
     * @inheritDoc
     */
    prepare({xpub, fromAddress, toAddress, options = {}}) {
        throw new Error('Implement sign method for service ' + this.constructor.name);
    };
}

module.exports = UTXObasedPrepareTransaction;