'use strict';

const { BaseCryptoAPIsLibAwareService } = require("./baseServices");

/**
 * BroadcastService
 *
 * @class BroadcastService
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
        this.apiInstance = new this._cryptoApis.FeaturesApi();
    }

    /**
     * @param {string} signedTransactionHex
     * @param {string} callbackSecretKey
     * @param {string} callbackUrl
     * @param {string|null} context
     * @returns {broadcastLocallySignedTransaction}
     */
    async broadcastLocallySignedTransaction(signedTransactionHex, callbackSecretKey, callbackUrl, context) {
        const item = new this._cryptoApis.BroadcastLocallySignedTransactionRBDataItem(signedTransactionHex, callbackSecretKey, callbackUrl);
        const postData = new this._cryptoApis.BroadcastLocallySignedTransactionRBData(item);

        const opts = {
            context: context,
            broadcastLocallySignedTransactionRB: new this._cryptoApis.BroadcastLocallySignedTransactionRB(postData)
        };

        return this.apiInstance.broadcastLocallySignedTransaction(this._blockchain, this._network, opts);
    }
}

module.exports = BroadcastService;