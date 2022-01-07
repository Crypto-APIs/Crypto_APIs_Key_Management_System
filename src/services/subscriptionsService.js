'use strict';

const CryptoApis = require("cryptoapis");

class SubscriptionsService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.apiInstance = new CryptoApis.CreateSubscriptionsForApi();
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
        const item = new CryptoApis.NewUnconfirmedCoinsTransactionsRBDataItem(address, callbackUrl);
        const postData = new CryptoApis.NewUnconfirmedCoinsTransactionsRBData(item);

        const opts = {
            context: context,
            'newUnconfirmedCoinsTransactionsRB': new CryptoApis.NewUnconfirmedCoinsTransactionsRB(postData)
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
        const item = new CryptoApis.NewUnconfirmedTokensTransactionsRBDataItem(address, callbackUrl);
        const postData = new CryptoApis.NewUnconfirmedTokensTransactionsRBData(item);

        const opts = {
            context: context,
            'newUnconfirmedTokensTransactionsRB': new CryptoApis.NewUnconfirmedTokensTransactionsRB(postData)
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
        const item = new CryptoApis.NewConfirmedInternalTransactionsRBDataItem(address, false, 'secret', callbackUrl);
        const postData = new CryptoApis.NewConfirmedInternalTransactionsRBData(item);

        const opts = {
            context: context,
            'newConfirmedInternalTransactionsRB': new CryptoApis.NewConfirmedInternalTransactionsRB(postData)
        };

        return this.apiInstance.newConfirmedInternalTransactions(this.blockchain, this.network, opts);
    }
}

module.exports = SubscriptionsService;