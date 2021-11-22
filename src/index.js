'use strict';

const dotenv = require('dotenv').config();
const walletService = require('./services/wallet');
const syncHDwalletsApi = require('./services/SyncHdWalletsApi');
const createSubscriptionForApi = require('./services/createSubscriptionForApi');
const broadcastLocallySignedTx = require('./services/broadcastLocallySignedTx');
const Cryptoapis = require('cryptoapis');

class CryptoapisKms {

    /**
     * @param {string} blockchain String | Represents the specific blockchain protocol name, e.g. Ethereum, Bitcoin, etc.
     * @param {string} network Represents the name of the blockchain network used; blockchain networks are usually identical as technology and software, but they differ in data, e.g. - \"mainnet\" is the live network with actual data while networks like \"testnet\", \"ropsten\" are test networks.
     */
    constructor(blockchain, network= undefined) {
        // init API client
        const API_KEY = process.env.API_KEY;
        let defaultClient = Cryptoapis.ApiClient.instance;
        let ApiKey = defaultClient.authentications['ApiKey'];
        ApiKey.apiKey = API_KEY;

        this.network = network || process.env.NETWORK;
        this.blockchain = blockchain;
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
     */
    syncHDWallet(exPub) {
        const syncHDwalletsApiService = new syncHDwalletsApi(this.blockchain, this.network, exPub);
        return syncHDwalletsApiService.syncHDWalletXPubYPubZPub();
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, address) {
        const createSubscriptionForApiService = new createSubscriptionForApi(this.blockchain, this.network);
        return createSubscriptionForApiService.newUnconfirmedCoinsTxs(callbackUrl, address);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedTokensTxs(callbackUrl, address) {
        const createSubscriptionForApiService = new createSubscriptionForApi(this.blockchain, this.network);
        return createSubscriptionForApiService.newUnconfirmedTokensTxs(callbackUrl, address);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @returns {Promise<void>}
     */
    createSubscriptionForUnconfirmedInternalTxs(callbackUrl, address) {
        const createSubscriptionForApiService = new createSubscriptionForApi(this.blockchain, this.network);
        return createSubscriptionForApiService.newConfirmedInternalTxs(callbackUrl, address);
    }

    /**
     * @param {string} callbackUrl
     * @param {string} signedTransactionHex
     * @constructor
     */
    broadcastLocallySignedTx(callbackUrl, signedTransactionHex) {
        const createSubscriptionForApiService = new broadcastLocallySignedTx(this.blockchain, this.network);
        return createSubscriptionForApiService.broadcastLocallySignedTransaction(callbackUrl, signedTransactionHex);
    }
}

module.exports = CryptoapisKms;
