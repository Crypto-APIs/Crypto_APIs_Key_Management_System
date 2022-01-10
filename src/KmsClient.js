'use strict';

const validateConfig = require("./validators/configValidator")
    , cryptoApis = require("cryptoapis")
    , walletService = require("./services/walletService")
    , hdWalletService = require("./services/hdWalletsService")
    , {
        hdWalletDTO,
        subscriptionForUnconfirmedCoinsTxsDTO,
        subscriptionForUnconfirmedTokensTxsDTO,
        subscriptionForUnconfirmedInternalTxsDTO,
        broadcastedTransactionCallbackDTO,
        walletServiceDTO
    } = require("./dtos")
    , subscriptionsService = require("./services/subscriptionsService")
    , broadcastService = require("./services/broadcastService")
    , callbacksService = require("./services/callbacksService");

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

        this.network = network.toLowerCase();
        this.blockchain = blockchain.toLowerCase();
    }

    /**
     * Create wallet for specified blockchain and network
     * @returns {Promise<{seed: string, blockchain: string, xpubsList: *[], mnemonic: string, network}>}
     */
    createWallet() {
        const service = new walletService();
        return service.createWallet(this.blockchain, this.network).then((data) => {
            return new walletServiceDTO(data);
        }, (error) => {
            console.error(error);
        })
    }

    /**
     * @param {string} exPub Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {string|null} context
     * @returns {hdWalletDTO}
     */
    syncHDWallet(exPub, context = null) {
        const hdWalletApiService = new hdWalletService(this.blockchain, this.network, exPub);
        return hdWalletApiService.syncHDWalletXPubYPubZPub(context).then((data) => {
            return new hdWalletDTO(data);
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedCoinsTxsDTO}
     */
    createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, address, context= null) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newUnconfirmedCoinsTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedCoinsTxsDTO(data).serialize();
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedTokensTxsDTO}
     */
    createSubscriptionForUnconfirmedTokensTxs(callbackUrl, address, context= null) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newUnconfirmedTokensTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedTokensTxsDTO(data).serialize();
        }, error => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedInternalTxsDTO}
     */
    createSubscriptionForUnconfirmedInternalTxs(callbackUrl, address, context= null) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newConfirmedInternalTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedInternalTxsDTO(data).serialize();
        }, error => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @param {string|null} context
     * @constructor
     */
    broadcastSignedTx(callbackUrl, signedTransactionHex, context= null) {
        const createSubscriptionForApiService = new broadcastService(this.blockchain, this.network);
        return createSubscriptionForApiService.broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex, context);
    }

    /**
     * @param {string} transactionId
     * @param {string|null} context
     * @returns {broadcastedTransactionCallbackDTO}
     */
    broadcastedTransactionCallback(transactionId, context = null) {
        const service = new callbacksService(this.blockchain, this.network);
        return service.broadcastedTransactionCallback(transactionId, context).then((data) => {
            return new broadcastedTransactionCallbackDTO(data).serialize();
        }, (error) => {
            console.error(error);
        });
    }
}

module.exports = KmsClient;