'use strict';


const BasePrepareTransaction = require("./basePrepareHelper");

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
     * @returns module:model/PrepareAUTXOBasedTransactionFromXPubR
     */

//     @param fee {module:model/PrepareAUTXOBasedTransactionFromXPubRBDataItemFee}
// @param prepareStrategy {module:model/PrepareAUTXOBasedTransactionFromXPubRBDataItem.PrepareStrategyEnum} Representation of the transaction's strategy type
// @param recipients {Array.<module:model/PrepareAUTXOBasedTransactionFromXPubRBDataItemRecipientsInner>} Represents a list of recipient addresses with the respective amounts. In account-based protocols like Ethereum there is only one address in this list.
    prepare({
        xpub,
        prepareStrategy,
        recipients,
        locktime,
        replaceable,
        data,
        options = {}
    }) {
        const fee = new this.cryptoApis.PrepareAUTXOBasedTransactionFromXPubRBDataItemFee('tb1q9msv4rgehy0ls027vahfaaczaqxawwrfmqnq27', 'standard')
        //fee, prepareStrategy, recipients, xpub
        // const recipients = [] //PrepareAUTXOBasedTransactionFromXPubRBDataItemRecipientsInner
        const receivers = recipients.map((recipient) => {
            return new this.cryptoApis.PrepareAUTXOBasedTransactionFromXPubRBDataItemRecipientsInner(recipient.address, recipient.amount);
        })
        const item = new this.cryptoApis.PrepareAUTXOBasedTransactionFromXPubRBDataItem(
            fee,
            prepareStrategy,
            receivers,
            xpub,
        );

        const postData = new this.cryptoApis.PrepareAUTXOBasedTransactionFromXPubRBData(item);
        item.additionalData = data;
        item.locktime = locktime;
        item.replaceable = replaceable;

        const opts = {
            prepareAUTXOBasedTransactionFromXPubRB: new this.cryptoApis.PrepareAUTXOBasedTransactionFromXPubRB(postData)
        };

        return this.featuresInstance.prepareAUTXOBasedTransactionFromXPub(this.blockchain, this.network, opts)
    };
}

module.exports = UTXObasedPrepareTransaction;