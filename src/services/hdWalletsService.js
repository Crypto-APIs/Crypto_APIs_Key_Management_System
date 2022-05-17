'use strict';

const BaseService = require("./baseService");

/**
 * HdWalletsService.
 *
 * @class HdWalletsService
 * @extends {BaseService}
 */
class HdWalletsService extends BaseService {
    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     * @param {string} extendedPublicKey
     */
    constructor(cryptoApis, blockchain, network, extendedPublicKey) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this._cryptoApis.HDWalletsApi();
        this.extendedPublicKey = extendedPublicKey;
    }

    /**
     * @param {string|null} context
     * @returns {syncHDWalletXPubYPubZPub}
     */
    async syncHDWalletXPubYPubZPub(context) {
        const item = new this._cryptoApis.SyncHDWalletXPubYPubZPubRBDataItem(this.extendedPublicKey);
        const postData = new this._cryptoApis.SyncHDWalletXPubYPubZPubRBData(item);

        const opts = {
            context: context,
            syncHDWalletXPubYPubZPubRB: new this._cryptoApis.SyncHDWalletXPubYPubZPubRB(postData)
        };

        return this.apiInstance.syncHDWalletXPubYPubZPub(this.blockchain, this.network, opts);
    }
}

module.exports = HdWalletsService;