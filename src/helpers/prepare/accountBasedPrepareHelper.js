'use strict';

const BasePrepareTransaction = require("./basePrepareHelper")
    , {AccountBasedFeeOptions} = require('../../models/feeOptions')
;

/**
 * AccountBasedPrepareTransaction
 *
 * @class AccountBasedPrepareTransaction
 * @extends {BasePrepareTransaction}
 */
class AccountBasedPrepareTransaction extends BasePrepareTransaction {
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
     * Through the “Prepare an account-based transaction from HD Wallet” endpoint users can prepare a transaction for signing from a synced with Crypto APIs address from the specific xPub. This endpoint applies to all supported account-based blockchain protocols, e.g. Ethereum, BSC, etc
     * @param {string} xPub Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {string} sender Represents a sender address
     * @param {string} recipient Represents a recipient address
     * @param {string} amount Representation of the amount of the transaction
     * @param {AccountBasedFeeOptions} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string|null} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareAnAccountBasedTransactionFromXPubR}
     */
    prepare({
        xPub,
        sender,
        recipient,
        amount,
        feeOptions,
        nonce,
        data
    }) {
        const fee = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBDataItemFee(feeOptions.getPriority())
        fee.exactAmount = feeOptions.getFeeAmount();

        const item = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBDataItem(
            amount,
            fee,
            recipient,
            sender,
            xPub,
        );

        item.additionalData = data;
        item.nonce = nonce;
        item.transactionType = "gas-fee-market-transaction";
        const postData = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBData(item);

        const opts = {
            prepareAnAccountBasedTransactionFromXPubRB: new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRB(postData)
        };

        return this.featuresInstance.prepareAnAccountBasedTransactionFromXPub(this.blockchain, this.network, opts)
    };
}

module.exports = AccountBasedPrepareTransaction;
