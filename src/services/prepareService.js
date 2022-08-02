'use strict';

const AccountBasedPrepareTransaction = require("../helpers/prepare/accountBasedPrepareHelper")
    , UTXOBasedPrepareTransaction = require("../helpers/prepare/UTXObasedPrepareHelper")
    , feePriorityEnum = require('../enumerations/feePriorities')
    , prepareStrategyEnum = require('../enumerations/prepareStrategies')
;const {BaseCryptoAPIsLibAwareService} = require("./baseServices");

/**
 * PrepareTransactionService
 *
 * @class PrepareTransactionService
 * @extends {BaseCryptoAPIsLibAwareService}
 */
class PrepareTransactionService  extends BaseCryptoAPIsLibAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
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
        const accountBasedService = new AccountBasedPrepareTransaction(
            this.cryptoApis,
            this.blockchain,
            this.network
        )

        return accountBasedService.prepare({
            xPub,
            sender,
            recipient,
            amount,
            feeOptions,
            nonce,
            data
        })
    };

    /**
     * Prepare An UTXO-Based Transaction From HD Wallet (xPub, yPub, zPub)
     * Through the “Prepare a UTXO-based transaction from HD Wallet” endpoint users can prepare a transaction for signing from all synced with Crypto APIs addresses for the specific xPub. This is based on the `selectionStrategy` and the addresses’ balances. In the case a user has an address not synced with Crypto APIs, it will not be included. This endpoint applies to all supported UTXO-based blockchain protocols, e.g. Bitcoin, Litecoin, etc.
     * @param {string} xPub Defines the account extended publicly known key which is used to derive all child public keys
     * @param {Array<Recipient>} recipients Represents a list of recipient addresses with the respective amounts
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
        const UTXOBasedService = new UTXOBasedPrepareTransaction(
            this.cryptoApis,
            this.blockchain,
            this.network
        )

        return UTXOBasedService.prepare({
            xPub,
            recipients,
            feeOptions,
            locktime,
            replaceable,
            data,
        });
    }
}

module.exports = PrepareTransactionService;