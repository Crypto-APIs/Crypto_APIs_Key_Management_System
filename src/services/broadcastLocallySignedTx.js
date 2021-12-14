'use strict';

const Cryptoapis = require("cryptoapis");

class BroadcastLocallySignedTx {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.apiInstance = new Cryptoapis.FeaturesApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @param {string} context
     * @returns {Promise<void>}
     */
    async broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex, context = '') {
        const item = new Cryptoapis.BroadcastLocallySignedTransactionRBDataItem(callbackUrl, signedTransactionHex);
        const postData = new Cryptoapis.BroadcastLocallySignedTransactionRBData(item);

        const opts = {
            context: context,
            'broadcastLocallySignedTransactionRB': new Cryptoapis.BroadcastLocallySignedTransactionRB(postData)
        };

        return this.apiInstance.broadcastLocallySignedTransaction(this.blockchain, this.network, opts);
    }
}

module.exports = BroadcastLocallySignedTx;