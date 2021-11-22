const Cryptoapis = require("cryptoapis");

class SyncHdWalletsApi {

    /**
     * @param {string} blockchain
     * @param {string} network
     * @param {string} extendedPublicKey
     */
    constructor(blockchain, network, extendedPublicKey) {
        this.apiInstance = new Cryptoapis.HDWalletsApi();
        this.blockchain = blockchain;
        this.network = network;
        this.extendedPublicKey = extendedPublicKey;
    }

    /**
     * @returns {Promise<void>}
     */
    async syncHDWalletXPubYPubZPub() {
        let item = new Cryptoapis.SyncHDWalletXPubYPubZPubRBDataItem(this.extendedPublicKey);
        let postData = new Cryptoapis.SyncHDWalletXPubYPubZPubRBData(item);

        let opts = {
            'context': "",
            'syncHDWalletXPubYPubZPubRB': new Cryptoapis.SyncHDWalletXPubYPubZPubRB(postData)
        };

        this.apiInstance.syncHDWalletXPubYPubZPub(this.blockchain, this.network, opts).then((data) => {
            console.log('API called successfully. Returned data: ' + data);
        }, (error) => {
            console.error(error);
            console.log(opts);
        });
    }
}

module.exports = SyncHdWalletsApi;