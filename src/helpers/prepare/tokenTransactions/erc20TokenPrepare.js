'use strict';

const BasePrepareHelper = require("../basePrepareHelper");

/**
 * ERC20TokenPrepareTransaction
 *
 * @class ERC20TokenPrepareTransaction
 *
 * @extends {BasePrepareHelper}
 */
class ERC20TokenPrepareTransaction extends BasePrepareHelper {
    /**
     * This endpoint is used to prepare a fungible token transfer from an address with private and public keys.
     * The address doesn’t have to belong to a wallet. The response will include the transaction fee in Wei
     * @param {string} contract Represents a contract address
     * @param {string} sender Represents a sender address
     * @param {string} recipient Represents a recipient address
     * @param {string} amount Representation of the amount of the transaction
     * @param {AccountBasedFeeOptionsModel} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string|null} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareAFungibleTokenTransferFromAddressRB}
     */
    prepare({
            contract,
            sender,
            recipient,
            amount,
            feeOptions,
            nonce,
            data
        }) {

        const fee = new this.cryptoApis.PrepareAFungibleTokenTransferFromAddressRBDataItemFee()
        fee.priority = feeOptions.getPriority();
        fee.exactAmount = feeOptions.getFeeAmount();

        const item = new this.cryptoApis.PrepareAFungibleTokenTransferFromAddressRBDataItem(
            amount,
            contract,
            recipient,
            sender,
            fee,
        );

        item.additionalData = data;
        item.nonce = nonce;
        const postData = new this.cryptoApis.PrepareAFungibleTokenTransferFromAddressRBData(item);

        const opts = {
            prepareAFungibleTokenTransferFromAddressRB: new this.cryptoApis.PrepareAFungibleTokenTransferFromAddressRB(postData)
        };

        return this.featuresApiInstance.prepareAFungibleTokenTransferFromAddress(this.blockchain, this.network, opts)
    };
}

module.exports = ERC20TokenPrepareTransaction;
