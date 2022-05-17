'use strict';

const BaseService = require("./baseService");

/**
 * BroadcastService.
 *
 * @class BroadcastService
 * @extends {BaseService}
 */
class BroadcastService extends BaseService {
    /**
     * @param {object} cryptoApis
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

        return this.apiInstance.broadcastLocallySignedTransaction(this.blockchain, this.network, opts);
    }
}

module.exports = BroadcastService;