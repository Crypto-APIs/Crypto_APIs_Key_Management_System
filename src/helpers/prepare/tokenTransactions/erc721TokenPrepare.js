'use strict';

const BasePrepareHelper = require("../basePrepareHelper");

/**
 * ERC721TokenPrepareTransaction
 *
 * @class ERC721TokenPrepareTransaction
 *
 * @extends {BasePrepareHelper}
 */
class ERC721TokenPrepareTransaction extends BasePrepareHelper {
    /**
     * This endpoint is used to prepare a non-fungible token transfer from an address with private and public keys.
     * The address doesn’t have to belong to a wallet. The response will include the transaction fee in Wei.
     * @param {string} contract Represents a contract address
     * @param {string} sender Represents a sender address
     * @param {string} recipient Represents a recipient address
     * @param {string} tokenId Representation of the token id
     * @param {AccountBasedFeeOptionsModel} feeOptions Represents the fee options
     * @param {string|null} nonce Representation of the nonce value
     * @param {string} data Representation of the additional data
     *
     * @returns {Promise|module:model/PrepareANonFungibleTokenTransferFromAddressR}
     */
    prepare({
            contract,
            sender,
            recipient,
            tokenId,
            feeOptions,
            nonce,
            data
        }) {

        const fee = new this.cryptoApis.PrepareANonFungibleTokenTransferFromAddressRBDataItemFee()
        fee.priority = feeOptions.getPriority();
        fee.exactAmount = feeOptions.getFeeAmount();

        const item = new this.cryptoApis.PrepareANonFungibleTokenTransferFromAddressRBDataItem(
            contract,
            recipient,
            sender,
            tokenId,
            fee
        );

        item.additionalData = data;
        item.nonce = nonce;
        const postData = new this.cryptoApis.PrepareANonFungibleTokenTransferFromAddressRBData(item);

        const opts = {
            prepareANonFungibleTokenTransferFromAddressRB: new this.cryptoApis.PrepareANonFungibleTokenTransferFromAddressRB(postData)
        };

        return this.featuresApiInstance.prepareANonFungibleTokenTransferFromAddress(this.blockchain, this.network, opts)
    };
}

module.exports = ERC721TokenPrepareTransaction;
