'use strict';

class BroadcastService {
    _cryptoApis;

    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        this._cryptoApis = cryptoApis;
        this.apiInstance = new this._cryptoApis.FeaturesApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @param {string|null} context
     * @returns {Promise<void>}
     */
    async broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex, context) {
        const item = new this._cryptoApis.BroadcastLocallySignedTransactionRBDataItem(callbackUrl, signedTransactionHex);
        const postData = new this._cryptoApis.BroadcastLocallySignedTransactionRBData(item);

        const opts = {
            context: context,
            broadcastLocallySignedTransactionRB: new this._cryptoApis.BroadcastLocallySignedTransactionRB(postData)
        };

        return this.apiInstance.broadcastLocallySignedTransaction(this.blockchain, this.network, opts);
    }
}

module.exports = BroadcastService;