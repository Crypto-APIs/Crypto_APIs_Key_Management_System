'use strict';

const { BaseCryptoAPIsLibAwareService } = require("./baseServices");

/**
 * BroadcastService
 *
 * @class BroadcastService
 *
 * @extends {BaseCryptoAPIsLibAwareService}
 */
class BroadcastService extends BaseCryptoAPIsLibAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain.
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this.cryptoApis.FeaturesApi();
    }

    /**
     * Broadcast Locally Signed Transaction
     * Through this endpoint customers can broadcast transactions that have been already signed locally. Instead of using a node for broadcasting a signed transaction users can use this endpoint. We then keep the user posted about the status by sending you a callback with a success or failure status.    {warning}This can be prepared and signed **only** locally, not through the API. We can provide support only for the process of broadcasting.{/warning}
     * @param {string} signedTransactionHex
     * @param {string|null} callbackSecretKey
     * @param {string|null} callbackUrl
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @return { module:model/BroadcastLocallySignedTransactionR}
     */
    async broadcastLocallySignedTransaction(signedTransactionHex, callbackSecretKey, callbackUrl, context) {
        const item = new this.cryptoApis.BroadcastLocallySignedTransactionRBDataItem(signedTransactionHex, callbackSecretKey, callbackUrl);
        const postData = new this.cryptoApis.BroadcastLocallySignedTransactionRBData(item);

        const opts = {
            context: context,
            broadcastLocallySignedTransactionRB: new this.cryptoApis.BroadcastLocallySignedTransactionRB(postData)
        };

        return this.apiInstance.broadcastLocallySignedTransaction(this.blockchain, this.network, opts);
    }
}

module.exports = BroadcastService;