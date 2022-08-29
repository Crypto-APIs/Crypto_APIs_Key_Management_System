'use strict';

const validateConfig = require('./validators/configValidator')
    , cryptoApis = require('cryptoapis')
    , {
    HDWalletDTO,
    SubscriptionForUnconfirmedCoinsTxsDTO,
    SubscriptionForUnconfirmedTokensTxsDTO,
    SubscriptionForUnconfirmedInternalTxsDTO,
    BroadcastSignedTxDTO,
    HDAddressesDTO,
    ListSyncedAddressesDTO,
    AccountBasedTransactionDTO,
    UTXOBasedTransactionDTO
} = require('./dtos')
    , {
    HDWalletService,
    BroadcastService,
    SubscriptionsService,
    PrepareService,
} = require('./services')
    , feePriorityEnum = require("./enumerations/feePriorityEnum")
    , prepareStrategyEnum = require("./enumerations/feePriorityEnum")

class KmsClient {
    /**
     * @param {string} apiKey
     * @param {string} blockchain Represents the specific blockchain protocol name, e.g. Ethereum, Bitcoin, etc.
     * @param {string} network Represents the name of the blockchain network used; blockchain networks are usually identical as technology and software, but they differ in data, e.g. - \"mainnet\" is the live network with actual data while networks like \"testnet\", \"goerli\" are test networks.
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
        this.hdWalletApiService = new HDWalletService(this._apiClient, this.blockchain, this.network);
        this.broadcastApiService = new BroadcastService(this._apiClient, this.blockchain, this.network);
        this.subscriptionsApiService = new SubscriptionsService(this._apiClient, this.blockchain, this.network);
        this.prepareService = new PrepareService(this._apiClient, this.blockchain, this.network);
    }

    /**
     * Sync New HD Wallet (xPub yPub zPub)
     * Through this endpoint users can add a brand new xPub to the Crypto APIs system to be ready for deriving. Unlike our other similar endpoint “Sync HD Wallet (xPub, yPub, zPub)”, this endpoint does not create new addresses nor syncs old data.
     * @param {string} extendedPublicKey
     * @param {string|null} context
     * @returns {module:model/SyncNewHDWalletXPubYPubZPubR}
     */
    syncNewHDWallet(extendedPublicKey, context = null) {
        return this.hdWalletApiService.syncNewHDWallet(extendedPublicKey, context).then((data) => {
            return new HDWalletDTO(data);
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
            return new SubscriptionForUnconfirmedCoinsTxsDTO(data);
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
            return new SubscriptionForUnconfirmedTokensTxsDTO(data);
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
            return new SubscriptionForUnconfirmedInternalTxsDTO(data);
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
    deriveAndSyncNewChangeAddresses(extendedPublicKey, context = null) {
        return this.hdWalletApiService.deriveAndSyncNewChangeAddresses(extendedPublicKey, context).then((data) => {
            return new HDAddressesDTO(data);
        });
    }

    /**
     * Derive And Sync New Receiving Addresses
     * Through this endpoint users can derive 100 receiving addresses, starting from the last index we have data for, which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will start from index 0.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/DeriveAndSyncNewChangeAddressesR}
     */
    deriveAndSyncNewReceivingAddresses(extendedPublicKey, context = null) {
        return this.hdWalletApiService.deriveAndSyncNewReceivingAddresses(extendedPublicKey, context).then((data) => {
            return new HDAddressesDTO(data);
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
            return new ListSyncedAddressesDTO(data);
        });
    }

    /**
     * Prepare An Account-Based Transaction From HD Wallet (xPub, yPub, zPub)
     * Through the “Prepare an account-based transaction from xPub” endpoint users can prepare a transaction for signing from a synced with Crypto APIs address from the specific xPub. This endpoint applies to all supported account-based blockchain protocols, e.g. Ethereum, BSC, etc
     * @param {string} xPub Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {string} sender Represents a  sender address
     * @param {string} recipient Represents a recipient address
     * @param {string} amount Representation of the amount of the transaction
     * @param {AccountBasedFeeOptions} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string|null} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareAnAccountBasedTransactionFromHDWalletXPubYPubZPubR}
     */
    prepareAccountBasedTransactionFromHDWallet({
       xPub,
       sender,
       recipient,
       amount,
       feeOptions,
       nonce,
       data
    }){
        return this.prepareService.prepareAccountBasedTransactionFromHDWallet({
            xPub,
            sender,
            recipient,
            amount,
            feeOptions,
            nonce,
            data
        }).then((data) => {
            return new AccountBasedTransactionDTO(data);
        });
    }

    /**
     * Prepare An UTXO-Based Transaction From HD Wallet (xPub, yPub, zPub)
     * Through the “Prepare a UTXO-based transaction from HD Wallet” endpoint users can prepare a transaction for signing from all synced with Crypto APIs addresses for the specific xPub. This is based on the `selectionStrategy` and the addresses’ balances. In the case a user has an address not synced with Crypto APIs, it will not be included. This endpoint applies to all supported UTXO-based blockchain protocols, e.g. Bitcoin, Litecoin, etc.
     * @param {string} xPub Defines the account extended publicly known key which is used to derive all child public keys
     * @param {Array<RecipientModel>} recipients Represents a list of recipient addresses with the respective amounts
     * @param {UTXOBasedFeeOptions} feeOptions Represents the fee options
     * @param {Number} locktime Represents the time at which a particular transaction can be added to the blockchain.
     * @param {Boolean} replaceable Representation of whether the transaction is replaceable
     * @param {string} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubR}
     */
    prepareUTXOBasedTransactionFromHDWallet({
        xPub,
        recipients,
        feeOptions,
        locktime,
        replaceable,
        data,
    }){

        return this.prepareService.prepareUTXOBasedTransactionFromHDWallet({
            xPub,
            recipients,
            feeOptions,
            locktime,
            replaceable,
            data,
        }).then((data) => {
            return new UTXOBasedTransactionDTO(data);
        });
    }

    /**
     * @param {string} signedTransactionHex
     * @param {string} callbackSecretKey
     * @param {string} callbackUrl
     * @param {string|null} context
     * @returns {BroadcastSignedTxDTO}
     */
    broadcastSignedTx(signedTransactionHex, callbackSecretKey, callbackUrl, context = null) {
        return this.broadcastApiService.broadcastLocallySignedTransaction(signedTransactionHex, callbackSecretKey, callbackUrl, context).then(data => {
            return new BroadcastSignedTxDTO(data);
        }, error => {
            throw error;
        });
    }
}

module.exports = KmsClient;