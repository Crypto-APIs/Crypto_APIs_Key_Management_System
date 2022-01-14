'use strict';

class CallbacksService {
    _cryptoApis;

    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        this._cryptoApis = cryptoApis;
        this.apiInstance = new this._cryptoApis.CallbackDataApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} transactionId
     * @param {string|null} context
     * @returns {getTransactionDetailsByTransactionIDFromCallback}
     */
    broadcastedTransactionCallback(transactionId, context) {
        const opts = {
            context: context,
        };

        return this.apiInstance.getTransactionDetailsByTransactionIDFromCallback(this.blockchain, this.network, transactionId, opts);
    }
}

module.exports = CallbacksService;