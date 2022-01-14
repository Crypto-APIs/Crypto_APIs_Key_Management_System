'use strict';

class HdWalletsService {
    _cryptoApis;

    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     * @param {string} extendedPublicKey
     */
    constructor(cryptoApis, blockchain, network, extendedPublicKey) {
        this._cryptoApis = cryptoApis;
        this.apiInstance = new this._cryptoApis.HDWalletsApi();
        this.blockchain = blockchain;
        this.network = network;
        this.extendedPublicKey = extendedPublicKey;
    }

    /**
     * @param {string|null} context
     * @returns {Promise<void>}
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