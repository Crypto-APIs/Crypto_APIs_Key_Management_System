const Cryptoapis = require("cryptoapis");

class CreateSubscriptionForApi {
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
     * @returns {Promise<void>}
     */
    newUnconfirmedCoinsTxs(callbackUrl, address) {
        let item = new Cryptoapis.NewUnconfirmedCoinsTransactionsRBDataItem(address, callbackUrl);
        let postData = new Cryptoapis.NewUnconfirmedCoinsTransactionsRBData(item);

        let opts = {
            'context': "",
            'newUnconfirmedCoinsTransactionsRB': new Cryptoapis.NewUnconfirmedCoinsTransactionsRB(postData)
        };
        this.apiInstance.newUnconfirmedCoinsTransactions(this.blockchain, this.network, opts).then((data) => {
            return data;
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @returns {Promise<void>}
     */
    newUnconfirmedTokensTxs(callbackUrl, address) {
        let item = new Cryptoapis.NewUnconfirmedTokensTransactionsRBDataItem(address, callbackUrl);
        let postData = new Cryptoapis.NewUnconfirmedTokensTransactionsRBData(item);

        let opts = {
            'context': "",
            'newUnconfirmedTokensTransactionsRB': new Cryptoapis.NewUnconfirmedTokensTransactionsRB(postData)
        };
        this.apiInstance.newUnconfirmedTokensTransactions(this.blockchain, this.network, opts).then((data) => {
            return data;
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @returns {Promise<void>}
     */
    newConfirmedInternalTxs(callbackUrl, address) {
        let item = new Cryptoapis.NewConfirmedInternalTransactionsRBDataItem(address, false, 'secret', callbackUrl);
        let postData = new Cryptoapis.NewConfirmedInternalTransactionsRBData(item);

        let opts = {
            'context': "",
            'newConfirmedInternalTransactionsRB': new Cryptoapis.NewConfirmedInternalTransactionsRB(postData)
        };
        this.apiInstance.newConfirmedInternalTransactions(this.blockchain, this.network, opts).then((data) => {
            return data;
        }, (error) => {
            console.error(error);
        });
    }
}

module.exports = CreateSubscriptionForApi;