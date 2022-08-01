'use strict';

const BasePrepareTransaction = require("./basePrepareHelper")
    , {UTXOBasedFeeOptions} = require('../../models/feeOptions')
    , Recipient = require('../../models/recipient')
;

/**
 * UTXObasedPrepareTransaction
 *
 * @class UTXObasedPrepareTransaction
 * @extends {BasePrepareTransaction}
 */
class UTXObasedPrepareTransaction extends BasePrepareTransaction {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
    }

    /**
     * Prepare An UTXO-Based Transaction From HD Wallet (xPub, yPub, zPub)
     * @param {string} xPub Defines the account extended publicly known key which is used to derive all child public keys
     * @param {Array<Recipient>} recipients Represents a list of recipient addresses with the respective amounts
     * @param {UTXOBasedFeeOptions} feeOptions Represents the fee options
     * @param {Number} locktime Represents the time at which a particular transaction can be added to the blockchain
     * @param {Boolean} replaceable Representation of whether the transaction is replaceable
     * @param {string} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubR}
     */
    prepare({
        xPub,
        recipients,
        feeOptions,
        locktime,
        replaceable,
        data,
    }) {
        const fee = new this.cryptoApis.PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRBDataItemFee()
        fee.address = feeOptions.getFeeAddress();
        fee.exactAmount = feeOptions.getFeeAmount()
        fee.priority = feeOptions.getPriority();

        const receivers = recipients.map((recipient) => {
            return new this.cryptoApis.PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRBDataItemRecipientsInner(
                recipient.getAddress(),
                recipient.getAmount());
        });

        const item = new this.cryptoApis.PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRBDataItem(
            fee,
            receivers,
            xPub,
        );

        item.prepareStrategy = feeOptions.getPrepareStrategy();
        item.additionalData = data;
        item.locktime = locktime;
        item.replaceable = replaceable;
        const postData = new this.cryptoApis.PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRBData(item);

        const opts = {
            prepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRB: new this.cryptoApis.PrepareAUTXOBasedTransactionFromHDWalletXPubYPubZPubRB(postData)
        };

        return this.featuresInstance.prepareAUTXOBasedTransactionFromHDWalletXPubYPubZPub(this.blockchain, this.network, opts)
    };
}

module.exports = UTXObasedPrepareTransaction;