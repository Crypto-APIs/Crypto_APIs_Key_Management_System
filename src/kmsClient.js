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
    hdAddressesDTO,
    listDTO,
    accountBasedTransactionDTO,
    utxoBasedTransactionDTO,
    signDTO
} = require('./dtos')
    , {
    hdWalletService,
    walletService,
    broadcastService,
    callbacksService,
    subscriptionsService,
    prepareService,
    signService
} = require('./services')
    , feePriorities = require("./enumerations/feePriorities")

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
        this.signService = new signService(this.blockchain, this.network);
        this.prepareService = new prepareService(this._apiClient, this.blockchain, this.network);
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
     * Sync New xPub
     * Through this endpoint users can add a brand new xPub to the Crypto APIs system to be ready for deriving. Unlike our other similar endpoint “Sync HD Wallet (xPub, yPub, zPub)”, this endpoint does not create new addresses nor syncs old data.
     * @param {string} extendedPublicKey
     * @param {string|null} context
     * @returns {module:model/SyncNewXPubR}
     */
    syncNewXPub(extendedPublicKey, context) {
        return this.hdWalletApiService.syncNewXPub(extendedPublicKey, context).then((data) => {
            return new hdWalletDTO(data);
        });
    }

    /**
     * @param {string} callbackUrl
     * @param {string} address
     * @param {string|null} context
     * @returns {subscriptionForUnconfirmedCoinsTxsDTO}
     */
    createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, address, context = null) {

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
    createSubscriptionForUnconfirmedTokensTxs(callbackUrl, address, context = null) {

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
    createSubscriptionForUnconfirmedInternalTxs(callbackUrl, address, context = null) {

        return this.subscriptionsApiService.newConfirmedInternalTxs(callbackUrl, address, context).then(data => {
            return new subscriptionForUnconfirmedInternalTxsDTO(data);
        }, error => {
            throw error;
        });
    }

    /**
     * Derive And Sync New Change Addresses
     * Through this endpoint users can derive 100 change addresses, starting from the last index we have data for, which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will start from index 0.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/DeriveAndSyncNewChangeAddressesR}
     */
    deriveAndSyncNewChangeAddresses(extendedPublicKey, context) {
        return this.hdWalletApiService.deriveAndSyncNewChangeAddresses(extendedPublicKey, context).then((data) => {
            return new hdAddressesDTO(data);
        });
    }

    /**
     * Derive And Sync New Receiving Addresses
     * Through this endpoint users can derive 100 receiving addresses, starting from the last index we have data for, which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will start from index 0.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/DeriveAndSyncNewChangeAddressesR}
     */
    deriveAndSyncNewReceivingAddresses(extendedPublicKey, context) {
        return this.hdWalletApiService.deriveAndSyncNewReceivingAddresses(extendedPublicKey, context).then((data) => {
            return new hdAddressesDTO(data);
        });
    }

    /**
     * List Synced Addresses
     * Through this endpoint users can list all addresses that Crypto APIs has synced for a specific xPub. This includes previous and current/new xPubs, what addresses we’ve synced for them, etc.
     * @param {String} extendedPublicKey Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {Object} opts Optional parameters
     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @param {Boolean} opts.isChangeAddress Defines if the address is change addres or not. (default to true)
     * @param {String} opts.addressFormat Represents the format of the address.
     * @returns {module:model/ListSyncedAddressesR}
     */
    listSyncedAddresses(extendedPublicKey, opts) {
        return this.hdWalletApiService.listSyncedAddressesByXpub(extendedPublicKey, opts).then((data) => {
            return new listDTO(data);
        });
    }

    /**
     * @param {string} xpub
     * @param {string} sender
     * @param {string} recipient
     * @param {string} amount
     * @param {feePriorities|null} priority
     * @param {string|null} feeAmount
     * @param {string|null} nonce
     * @param {string|null} data
     */
    prepareAccountBasedTransactionFromXpub({
       xpub,
       sender,
       recipient,
       amount,
       priority,
       feeAmount,
       nonce,
       data
    }){
        return this.prepareService.prepareAccountBasedTransactionFromXpub({
            xpub,
            sender,
            recipient,
            amount,
            priority,
            feeAmount,
            nonce,
            data
        }).then((data) => {
            return new accountBasedTransactionDTO(data);
        });
    }

    /**
     // * @param {string} xpub
     // * @param {string} fromAddress
     // * @param {string} toAddress;
     // * @param {Object} options
     */
    prepareUTXOBasedTransactionFromXpub({
        xpub,
        prepareStrategy,
        recipients,
        locktime,
        replaceable,
        data, options = {}
    }){

        return this.prepareService.prepareUTXOBasedTransactionFromXpub({
            xpub,
            prepareStrategy,
            recipients,
            locktime,
            replaceable,
            data,
            options
        }).then((data) => {
            return new utxoBasedTransactionDTO(data);
        });
    }


    /**
     * Sign Prepared Transaction Locally
     * Through this endpoint users sign their transactions locally(offline) using the transaction response from Prepare Transaction From XPUB endpoint, both for account-based and UTXO-based
     * @param {string} xpriv extended account xpriv
     * @param {TransactionDTO} transaction
     * @throws {Error}
     * @return {{id: string, raw: string}}
     */
    signPreparedTransactionLocally(xpriv, transaction) {
        try {
             const signed = this.signService.signPreparedTransaction(xpriv, transaction);
             return new signDTO(signed)
        } catch (error) {
            throw error;
        }
    };


    /**
     * @param {string} signedTransactionHex
     * @param {string} callbackSecretKey
     * @param {string} callbackUrl
     * @param {string|null} context
     * @returns {broadcastSignedTxDTO}
     */
    broadcastSignedTx(signedTransactionHex, callbackSecretKey, callbackUrl, context = null) {

        return this.broadcastApiService.broadcastLocallySignedTransaction(signedTransactionHex, callbackUrl, context).then(data => {
            return new broadcastSignedTxDTO(data);
        }, error => {
            throw error;
        });

    }

    /**
     * Get Transaction Details By Transaction ID From Callback
     * This endpoint creates a shortcut to obtain information from Blockchain data by going through Blockchain Events and a specific Event Subscription. It provides data for a specific transaction from the Event it takes part in by providing the `transactionId` attribute. It applies only for Events related to that user.
     * @param {String} transactionId Represents the unique identifier of a transaction, i.e. it could be transactionId in UTXO-based protocols like Bitcoin, and transaction hash in Ethereum blockchain.
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @return {module:model/GetTransactionDetailsByTransactionIDFromCallbackR}
     */
    broadcastedTransactionCallback(transactionId, context) {

        return this.callbacksApiService.getTransactionDetailsByTransactionIDFromCallback(transactionId, context).then((data) => {
            return new broadcastedTransactionCallbackDTO(data);
        }, (error) => {
            throw error;
        });
    }
}

module.exports = KmsClient;