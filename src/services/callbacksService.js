'use strict';

const { BaseCryptoAPIsLibAwareService } = require("./baseServices");

/**
 * CallbacksService
 *
 * @class CallbacksService
 * @extends {BaseCryptoAPIsLibAwareService}
 */
class CallbacksService extends BaseCryptoAPIsLibAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this.cryptoApis.CallbackDataApi();
    }

    /**
     * Get Transaction Details By Transaction ID From Callback
     * This endpoint creates a shortcut to obtain information from Blockchain data by going through Blockchain Events and a specific Event Subscription. It provides data for a specific transaction from the Event it takes part in by providing the `transactionId` attribute. It applies only for Events related to that user.
     * @param {String} transactionId Represents the unique identifier of a transaction, i.e. it could be transactionId in UTXO-based protocols like Bitcoin, and transaction hash in Ethereum blockchain.
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @return {module:model/GetTransactionDetailsByTransactionIDFromCallbackR}
     */
    getTransactionDetailsByTransactionIDFromCallback(transactionId, context) {
        const opts = {
            context: context,
        };

        return this.apiInstance.getTransactionDetailsByTransactionIDFromCallback(this.blockchain, this.network, transactionId, opts);
    }
}

module.exports = CallbacksService;