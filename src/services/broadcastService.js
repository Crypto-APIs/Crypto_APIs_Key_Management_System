'use strict';

const CryptoApis = require("cryptoapis");

class BroadcastService {

    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.apiInstance = new CryptoApis.FeaturesApi();
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
        const item = new CryptoApis.BroadcastLocallySignedTransactionRBDataItem(callbackUrl, signedTransactionHex);
        const postData = new CryptoApis.BroadcastLocallySignedTransactionRBData(item);

        const opts = {
            context: context,
            'broadcastLocallySignedTransactionRB': new CryptoApis.BroadcastLocallySignedTransactionRB(postData)
        };

        return this.apiInstance.broadcastLocallySignedTransaction(this.blockchain, this.network, opts);
    }
}

module.exports = BroadcastService;