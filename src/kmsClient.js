'use strict';

const validateConfig = require('./validators/configValidator')
    , cryptoApis = require('cryptoapis')
    , {
        walletServiceDTO,
        hdWalletDTO,
        subscriptionForUnconfirmedCoinsTxsDTO,
        subscriptionForUnconfirmedTokensTxsDTO,
        subscriptionForUnconfirmedInternalTxsDTO,
        broadcastedTransactionCallbackDTO,
        broadcastSignedTxDTO,
        hdAddressesDTO
    } = require('./dtos')
    , {
        hdWalletService,
        walletService,
        broadcastService,
        callbacksService,
        subscriptionsService
    } = require('./services');

class KmsClient {
    /**
     * @param {string} apiKey
     * @param {string} blockchain Represents the specific blockchain protocol name, e.g. Ethereum, Bitcoin, etc.
     * @param {string} network Represents the name of the blockchain network used; blockchain networks are usually identical as technology and software, but they differ in data, e.g. - \"mainnet\" is the live network with actual data while networks like \"testnet\", \"ropsten\" are test networks.
     */
    constructor(apiKey, blockchain, network) {
        validateConfig.init(apiKey, blockchain, network);

        // init API client
        const defaultClient = cryptoApis.ApiClient.instance;
        const ApiKey = defaultClient.authentications['ApiKey'];
        ApiKey.apiKey = apiKey;

        this._apiClient = cryptoApis;
        this.network = network.toLowerCase();
        this.blockchain = blockchain.toLowerCase();

        //init all services
        this.hdWalletApiService = new hdWalletService(this._apiClient, this.blockchain, this.network);
        this.walletApiService = new walletService(this.blockchain, this.network);
        this.broadcastApiService = new broadcastService(this._apiClient, this.blockchain, this.network);
        this.callbacksApiService = new callbacksService(this._apiClient, this.blockchain, this.network);
        this.subscriptionsApiService = new subscriptionsService(this._apiClient, this.blockchain, this.network);
    }

    /**
     * Create wallet for specified blockchain and network
     * @returns {walletServiceDTO}
     */
    createWallet() {

        return this.walletApiService.createWallet().then((data) => {
            return new walletServiceDTO(data);
        })
    }

    /**
     * @param {string} extendedPublicKey Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {string|null} context
     * @returns {hdWalletDTO}
     */
    syncHDWallet(extendedPublicKey, context = null) {

        return this.hdWalletApiService.syncHDWalletXPubYPubZPub(extendedPublicKey, context).then((data) => {
            return new hdWalletDTO(data);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedCoinsTxsDTO}
     */
    createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, address, context= null) {

        return this.subscriptionsApiService.newUnconfirmedCoinsTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedCoinsTxsDTO(data);
        }, (error) => {
            throw error;
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedTokensTxsDTO}
     */
    createSubscriptionForUnconfirmedTokensTxs(callbackUrl, address, context= null) {

        return this.subscriptionsApiService.newUnconfirmedTokensTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedTokensTxsDTO(data);
        }, error => {
            throw error;
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedInternalTxsDTO}
     */
    createSubscriptionForUnconfirmedInternalTxs(callbackUrl, address, context= null) {

        return this.subscriptionsApiService.newConfirmedInternalTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedInternalTxsDTO(data);
        }, error => {
            throw error;
        });
    }

    /**
     * @param {string} signedTransactionHex
     * @param {string} callbackSecretKey
     * @param {string} callbackUrl
     * @param {string|null} context
     * @returns {broadcastSignedTxDTO}
     */
    broadcastSignedTx(signedTransactionHex, callbackSecretKey, callbackUrl, context= null) {

        return this.broadcastApiService.broadcastLocallySignedTransaction(signedTransactionHex, callbackUrl, context).then (data => {
            return new broadcastSignedTxDTO(data);
        }, error => {
            throw error;
        });

    }

    /**
     * @param {string} transactionId
     * @param {string|null} context
     * @returns {broadcastedTransactionCallbackDTO}
     */
    broadcastedTransactionCallback(transactionId, context = null) {

        return this.callbacksApiService.getTransactionDetailsByTransactionIDFromCallback(transactionId, context).then((data) => {
            return new broadcastedTransactionCallbackDTO(data);
        }, (error) => {
            throw error;
        });
    }

    /**
     * @param {string} extendedPublicKey Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {{context: String, addressFormat: String, addressesCount: Number, isChange: Boolean, startIndex: Number}|{}} opts Optional parameters
     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @param {String} opts.addressFormat Represents the format of the address.
     * @param {Number} opts.addressesCount Represents the addresses count.
     * @param {Boolean} opts.isChange Defines if the specific address is a change or deposit address. If the value is True - it is a change address, if it is False - it is a Deposit address.
     * @param {Number} opts.startIndex The starting index of the response items, i.e. where the response should start listing the returned items.
     * @returns {hdAddressesDTO}
     */
    deriveHDAddresses(extendedPublicKey, opts= null) {
        opts = opts || {};

        return this.hdWalletApiService.deriveHDWalletXPubYPubZPubChangeOrReceivingAddresses(extendedPublicKey, opts).then((data) => {
            return new hdAddressesDTO(data);
        });
    }
}

module.exports = KmsClient;