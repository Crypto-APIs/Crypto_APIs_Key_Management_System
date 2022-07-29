'use strict';

const BasePrepareTransaction = require("./basePrepareHelper")
    , feePriorities = require('../../enumerations/feePriorities')
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
     * @param {string} xpub
     * @param {string} sender
     * @param {string} recipient
     * @param {string} amount
     * @param {feePriorities|null} priority
     * @param {string|null} feeAmount
     * @param {string|null} nonce
     * @param {string|null} data
     *
     * @returns {module:model/PrepareAnAccountBasedTransactionFromXPubR}
     */
    prepare({
        xpub,
        sender,
        recipient,
        amount,
        priority,
        feeAmount,
        nonce,
        data
    }) {
        const fee = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBDataItemFee('standard')
        const transactionType = "gas-fee-market-transaction";
        const item = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBDataItem(
            amount,
            fee,
            recipient,
            sender,
            xpub,
        );

        const postData = new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRBData(item);
        item.additionalData = data;
        item.nonce = nonce;
        item.transactionType = transactionType;

        const opts = {
            prepareAnAccountBasedTransactionFromXPubRB: new this.cryptoApis.PrepareAnAccountBasedTransactionFromXPubRB(postData)
        };

        return this.featuresInstance.prepareAnAccountBasedTransactionFromXPub(this.blockchain, this.network, opts)
    };
}

module.exports = AccountBasedPrepareTransaction;
