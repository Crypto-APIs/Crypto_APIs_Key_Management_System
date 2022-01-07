'use strict';

const validateCallback = require('../validators/callbackValidator');
const CryptoApis = require("cryptoapis");

class CallbacksService {

    /**
     * @param {string} blockchain
     * @param {string} network
     * @param {object} postData
     */
    constructor(blockchain, network, postData) {
        this.apiInstance = new CryptoApis.CallbackDataApi();
        this.blockchain = blockchain;
        this.network = network;
        this.response = postData;
    }

    /**
     * @param {string} transactionId
     * @param {string} context
     * @returns {GetTransactionDetailsByTransactionIDFromCallback}
     */
    broadcastedTransactionCallback(transactionId, context) {
        validateCallback.init(this.response);

        let opts = {
            'context': context,
        };

        return this.apiInstance.getTransactionDetailsByTransactionIDFromCallback(this.blockchain, this.network, transactionId, opts);
    }
}

module.exports = CallbacksService;