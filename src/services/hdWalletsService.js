'use strict';

const CryptoApis = require("cryptoapis");

class HdWalletsService {

    /**
     * @param {string} blockchain
     * @param {string} network
     * @param {string} extendedPublicKey
     */
    constructor(blockchain, network, extendedPublicKey) {
        this.apiInstance = new CryptoApis.HDWalletsApi();
        this.blockchain = blockchain;
        this.network = network;
        this.extendedPublicKey = extendedPublicKey;
    }

    /**
     * @param {string} context
     * @returns {Promise<void>}
     */
    async syncHDWalletXPubYPubZPub(context = '') {
        const item = new CryptoApis.SyncHDWalletXPubYPubZPubRBDataItem(this.extendedPublicKey);
        const postData = new CryptoApis.SyncHDWalletXPubYPubZPubRBData(item);

        let opts = {
            'context': context,
            'syncHDWalletXPubYPubZPubRB': new CryptoApis.SyncHDWalletXPubYPubZPubRB(postData)
        };

        return this.apiInstance.syncHDWalletXPubYPubZPub(this.blockchain, this.network, opts)
    }
}

module.exports = HdWalletsService;