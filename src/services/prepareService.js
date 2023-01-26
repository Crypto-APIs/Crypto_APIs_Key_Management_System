'use strict';

const AccountBasedPrepareHelper = require("../helpers/prepare/accountBasedPrepareHelper")
    , UTXOBasedPrepareHelper = require("../helpers/prepare/UTXOBasedPrepareHelper")
    , {BaseCryptoAPIsLibAwareService} = require("./baseServices")
    , TokenPrepareHelperFactory = require("../helpers/prepare/tokenTransactions/tokenPrepareFactory")
;

/**
 * PrepareTransactionService
 *
 * @class PrepareTransactionService
 *
 * @extends {BaseCryptoAPIsLibAwareService}
 */
class PrepareTransactionService  extends BaseCryptoAPIsLibAwareService {
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
        const accountBasedService = new AccountBasedPrepareHelper(
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
        const UTXOBasedService = new UTXOBasedPrepareHelper(
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

    /**
     * Prepare A Token Transaction (ERC-20, ERC-721, BEP-20, BEP-721)
     * @param {string} tokenStandard token standard
     * @param {string} contract Represents a contract address
     * @param {string} sender Represents a  sender address
     * @param {string} recipient Represents a recipient address
     * @param {string|null} amount Representation of the amount of the token to be sent (ERC-20, BEP-20)
     * @param {string|null} tokenId Representation of the token id to be sent (ERC-721, BEP-721)
     * @param {AccountBasedFeeOptions} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string|null} data Representation of the additional data
     *
     * @returns {Promise<*>}
     */
    prepareTokenTransaction({
           tokenStandard,
           contract,
           sender,
           recipient,
           amount,
           tokenId,
           feeOptions,
           nonce,
           data
          }){

        const tokenService = TokenPrepareHelperFactory.create({
               cryptoApis: this.cryptoApis,
               blockchain: this.blockchain,
               network: this.network,
               tokenStandard: tokenStandard
        });

        return tokenService.prepare({
            tokenStandard,
            contract,
            sender,
            recipient,
            amount,
            tokenId,
            feeOptions,
            nonce,
            data
        })
    };
}

module.exports = PrepareTransactionService;