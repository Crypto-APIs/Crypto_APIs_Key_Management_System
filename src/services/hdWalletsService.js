'use strict';

const { BaseCryptoAPIsLibAwareService } = require("./baseServices");

/**
 * HdWalletsService
 *
 * @class HdWalletsService
 * @extends {BaseCryptoAPIsLibAwareService}
 */
class HdWalletsService extends BaseCryptoAPIsLibAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.hdWalletInstance = new this._cryptoApis.HDWalletsApi();
        this.featuresInstance = new this._cryptoApis.FeaturesApi()
    }

    /**
     * @param {string} extendedPublicKey
     * @param {string|null} context
     * @returns {syncHDWalletXPubYPubZPub}
     */
    async syncHDWalletXPubYPubZPub(extendedPublicKey, context) {
        const item = new this._cryptoApis.SyncHDWalletXPubYPubZPubRBDataItem(extendedPublicKey);
        const postData = new this._cryptoApis.SyncHDWalletXPubYPubZPubRBData(item);

        const opts = {
            context: context,
            syncHDWalletXPubYPubZPubRB: new this._cryptoApis.SyncHDWalletXPubYPubZPubRB(postData)
        };

        return this.hdWalletInstance.syncHDWalletXPubYPubZPub(this._blockchain, this._network, opts);
    }

    /**
     * @param {string} extendedPublicKey
     * @param {{context: String, addressFormat: String, addressesCount: Number, isChange: Boolean, startIndex: Number}|{}} opts Optional parameters
     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @param {String} opts.addressFormat Represents the format of the address.
     * @param {Number} opts.addressesCount Represents the addresses count.
     * @param {Boolean} opts.isChange Defines if the specific address is a change or deposit address. If the value is True - it is a change address, if it is False - it is a Deposit address.
     * @param {Number} opts.startIndex The starting index of the response items, i.e. where the response should start listing the returned items.
     * @returns {DeriveHDWalletXPubYPubZPubChangeOrReceivingAddressesR}
     */
    async deriveHDWalletXPubYPubZPubChangeOrReceivingAddresses(extendedPublicKey, opts) {

        return this.featuresInstance.deriveHDWalletXPubYPubZPubChangeOrReceivingAddresses(this._blockchain, extendedPublicKey, this._network, opts);
    }
}

module.exports = HdWalletsService;