'use strict';

const BaseService = require("./baseService");

/**
 * SubscriptionsService.
 *
 * @class SubscriptionsService
 * @extends {BaseService}
 */
class SubscriptionsService extends BaseService {
    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this._cryptoApis.CreateSubscriptionsForApi();
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {newUnconfirmedCoinsTransactions}
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
     * @returns {newUnconfirmedTokensTransactions}
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
     * @returns {newConfirmedInternalTransactions}
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