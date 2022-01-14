'use strict';

class SubscriptionsService {
    _cryptoApis;

    /**
     * @param {cryptoApi} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        this._cryptoApis = cryptoApis;
        this.apiInstance = new this._cryptoApis.CreateSubscriptionsForApi();
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {Promise<void>}
     */
    newUnconfirmedCoinsTxs(callbackUrl, address, context) {
        const item = new this._cryptoApis.NewUnconfirmedCoinsTransactionsRBDataItem(address, callbackUrl);
        const postData = new this._cryptoApis.NewUnconfirmedCoinsTransactionsRBData(item);

        const opts = {
            context: context,
            newUnconfirmedCoinsTransactionsRB: new this._cryptoApis.NewUnconfirmedCoinsTransactionsRB(postData)
        };

        return this.apiInstance.newUnconfirmedCoinsTransactions(this.blockchain, this.network, opts);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {Promise<void>}
     */
    newUnconfirmedTokensTxs(callbackUrl, address, context) {
        const item = new this._cryptoApis.NewUnconfirmedTokensTransactionsRBDataItem(address, callbackUrl);
        const postData = new this._cryptoApis.NewUnconfirmedTokensTransactionsRBData(item);

        const opts = {
            context: context,
            newUnconfirmedTokensTransactionsRB: new this._cryptoApis.NewUnconfirmedTokensTransactionsRB(postData)
        };

        return this.apiInstance.newUnconfirmedTokensTransactions(this.blockchain, this.network, opts);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {Promise<void>}
     */
    newConfirmedInternalTxs(callbackUrl, address, context) {
        const item = new this._cryptoApis.NewConfirmedInternalTransactionsRBDataItem(address, false, 'secret', callbackUrl);
        const postData = new this._cryptoApis.NewConfirmedInternalTransactionsRBData(item);

        const opts = {
            context: context,
            newConfirmedInternalTransactionsRB: new this._cryptoApis.NewConfirmedInternalTransactionsRB(postData)
        };

        return this.apiInstance.newConfirmedInternalTransactions(this.blockchain, this.network, opts);
    }
}

module.exports = SubscriptionsService;