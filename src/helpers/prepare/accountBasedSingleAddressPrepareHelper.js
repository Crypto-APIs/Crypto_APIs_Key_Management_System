'use strict';

const BasePrepareHelper = require("./basePrepareHelper");

/**
 * AccountBasedPrepareTransaction
 *
 * @class AccountBasedSingleAddressPrepareHelper
 *
 * @extends {BasePrepareHelper}
 */
class AccountBasedSingleAddressPrepareHelper extends BasePrepareHelper {
    /**
     * Through this endpoint users can prepare a transaction from an address with private and public keys.
     * The address does not have to belong to a wallet. The response will include the transaction fee in Wei.
     * @param {string} sender Represents a sender address
     * @param {string} recipient Represents a recipient address
     * @param {string} amount Representation of the amount of the transaction
     * @param {AccountBasedFeeOptionsModel} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string|null} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareTransactionFromAddressR}
     */
    prepare({
            sender,
            recipient,
            amount,
            feeOptions,
            nonce,
            data
        }) {
        const fee = new this.cryptoApis.PrepareTransactionFromAddressRBDataItemFee()
        fee.priority = feeOptions.getPriority();
        fee.exactAmount = feeOptions.getFeeAmount();

        const item = new this.cryptoApis.PrepareTransactionFromAddressRBDataItem(
            amount,
            recipient,
            sender,
            fee,
        );

        item.additionalData = data;
        item.nonce = nonce;
        const postData = new this.cryptoApis.PrepareTransactionFromAddressRBData(item);

        const opts = {
            prepareTransactionFromAddressRB: new this.cryptoApis.PrepareTransactionFromAddressRB(postData)
        };

        return this.featuresApiInstance.prepareTransactionFromAddress(this.blockchain, this.network, opts)
    };
}

module.exports = AccountBasedSingleAddressPrepareHelper;
