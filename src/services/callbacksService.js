'use strict';

const BaseService = require("./baseService");

/**
 * CallbacksService.
 *
 * @class CallbacksService
 * @extends {BaseService}
 */
class CallbacksService extends BaseService {
    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this._cryptoApis.CallbackDataApi();
    }

    /**
     * @param {string} transactionId
     * @param {string|null} context
     * @returns {getTransactionDetailsByTransactionIDFromCallback}
     */
    getTransactionDetailsByTransactionIDFromCallback(transactionId, context) {
        const opts = {
            context: context,
        };

        return this.apiInstance.getTransactionDetailsByTransactionIDFromCallback(this.blockchain, this.network, transactionId, opts);
    }
}

module.exports = CallbacksService;