'use strict';

const walletService = require('./services/walletService')
    , hdWalletService = require('./services/hdWalletService')
    , subscriptionsService = require('./services/subscriptionsService')
    , broadcastLocallySignedTx = require('./services/broadcastLocallySignedTx')
    , processCallbacks = require('./services/processCallbacksService')
    , cryptoapis = require('cryptoapis')
    , validateConfig = require("./validators/configValidator")
    , {
        hdWalletDTO,
        subscriptionForUnconfirmedCoinsTxsDTO,
        subscriptionForUnconfirmedTokensTxsDTO,
        subscriptionForUnconfirmedInternalTxsDTO
    } = require('./dtos/DTOFactory')
    , {blockchains: BlockchainsEnum} = require('./enumerations/blockchain')
    , {NETWORKS: NetworksEnum} = require('./enumerations/networks');

class CryptoapisKms {

    /**
     * @param {object} config = {
     *      {string} apiKey
     *      {BlockchainsEnum} blockchain Represents the specific blockchain protocol name, e.g. Ethereum, Bitcoin, etc.
     *      {NetworksEnum} network Represents the name of the blockchain network used; blockchain networks are usually identical as technology and software, but they differ in data, e.g. - \"mainnet\" is the live network with actual data while networks like \"testnet\", \"ropsten\" are test networks.
     * }
     */
    constructor(config = {}) {
        validateConfig.init(config);

        // init API client
        const defaultClient = cryptoapis.ApiClient.instance;
        const ApiKey = defaultClient.authentications['ApiKey'];
        ApiKey.apiKey = config.apiKey;

        this.network = config.network.toLowerCase();
        this.blockchain = config.blockchain.toLowerCase();
    }

    /**
     * create wallet for specified blockchain and network
     * @returns {Promise<{seed: string, blockchain: string, xpubsList: *[], mnemonic: string, network}>}
     */
    createWallet() {
        const ws = new walletService();
        return ws.createWallet(this.blockchain, this.network);
    }

    /**
     * @param {string} exPub Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {string} context
     * @returns {Promise<void>}
     */
    syncHDWallet(exPub, context) {
        const hdWalletApiService = new hdWalletService(this.blockchain, this.network, exPub);
        return hdWalletApiService.syncHDWalletXPubYPubZPub(context).then((data) => {
            return new hdWalletDTO(data).map();
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, address, context) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newUnconfirmedCoinsTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedCoinsTxsDTO(data).map();
        }, (error) => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedTokensTxs(callbackUrl, address, context) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newUnconfirmedTokensTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedTokensTxsDTO(data).map();
        }, error => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string} context
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedInternalTxs(callbackUrl, address, context) {
        const subscriptionsServiceApi = new subscriptionsService(this.blockchain, this.network);
        return subscriptionsServiceApi.newConfirmedInternalTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedInternalTxsDTO(data).map();
        }, error => {
            console.error(error);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @param {string} context
     * @constructor
     */
    broadcastLocallySignedTx(callbackUrl, signedTransactionHex, context) {
        const createSubscriptionForApiService = new broadcastLocallySignedTx(this.blockchain, this.network);
        return createSubscriptionForApiService.broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex, context);
    }

    /**
     * @param {object} response
     * @returns {*}
     */
    callbackSubscribedEvents(response) {
        const processCallbacksService = new processCallbacks();
        return processCallbacksService.callbackSubscribedEvents(response);
    }

    /**
     * @param {object} response
     * @returns {*}
     */
    broadcastedTransactionCallback(response) {
        const processCallbacksService = new processCallbacks();
        return processCallbacksService.broadcastedTransactionCallback(response);
    }
}

module.exports = {
    blockchains: BlockchainsEnum,
    networks: NetworksEnum,
    client: CryptoapisKms
};
