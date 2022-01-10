'use strict';

const CryptoApis = require("cryptoapis");

class CallbacksService {

    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.apiInstance = new CryptoApis.CallbackDataApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} transactionId
     * @param {string|null} context
     * @returns {GetTransactionDetailsByTransactionIDFromCallback}
     */
    broadcastedTransactionCallback(transactionId, context) {
        let opts = {
            'context': context,
        };

        return this.apiInstance.getTransactionDetailsByTransactionIDFromCallback(this.blockchain, this.network, transactionId, opts);
    }
}

module.exports = CallbacksService;