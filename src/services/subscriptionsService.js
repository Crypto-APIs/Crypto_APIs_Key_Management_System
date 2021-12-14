'use strict';

const Cryptoapis = require("cryptoapis");

class SubscriptionsService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.apiInstance = new Cryptoapis.CreateSubscriptionsForApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    newUnconfirmedCoinsTxs(callbackUrl, address, context = '') {
        const item = new Cryptoapis.NewUnconfirmedCoinsTransactionsRBDataItem(address, callbackUrl);
        const postData = new Cryptoapis.NewUnconfirmedCoinsTransactionsRBData(item);

        const opts = {
            context: context,
            'newUnconfirmedCoinsTransactionsRB': new Cryptoapis.NewUnconfirmedCoinsTransactionsRB(postData)
        };

        return this.apiInstance.newUnconfirmedCoinsTransactions(this.blockchain, this.network, opts);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    newUnconfirmedTokensTxs(callbackUrl, address, context= '') {
        const item = new Cryptoapis.NewUnconfirmedTokensTransactionsRBDataItem(address, callbackUrl);
        const postData = new Cryptoapis.NewUnconfirmedTokensTransactionsRBData(item);

        const opts = {
            context: context,
            'newUnconfirmedTokensTransactionsRB': new Cryptoapis.NewUnconfirmedTokensTransactionsRB(postData)
        };

        return this.apiInstance.newUnconfirmedTokensTransactions(this.blockchain, this.network, opts);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    newConfirmedInternalTxs(callbackUrl, address, context) {
        const item = new Cryptoapis.NewConfirmedInternalTransactionsRBDataItem(address, false, 'secret', callbackUrl);
        const postData = new Cryptoapis.NewConfirmedInternalTransactionsRBData(item);

        const opts = {
            context: context,
            'newConfirmedInternalTransactionsRB': new Cryptoapis.NewConfirmedInternalTransactionsRB(postData)
        };

        return this.apiInstance.newConfirmedInternalTransactions(this.blockchain, this.network, opts);
    }
}

module.exports = SubscriptionsService;