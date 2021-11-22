const Cryptoapis = require("cryptoapis");

class BroadcastLocallySignedTx {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @returns {Promise<void>}
     */
    async broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex) {
        let item = new Cryptoapis.BroadcastLocallySignedTransactionRBDataItem(callbackUrl, signedTransactionHex);
        let postData = new Cryptoapis.BroadcastLocallySignedTransactionRBData(item);

        let opts = {
            'context': "",
            'BroadcastLocallySignedTransactionRB': new Cryptoapis.BroadcastLocallySignedTransactionRB(postData)
        };
        new Cryptoapis.BroadcastLocallySignedTransactionRB(this.blockchain, this.network, opts).then((data) => {
            return data;
        }, (error) => {
            console.error(error);
        });
    }
}

module.exports = BroadcastLocallySignedTx;