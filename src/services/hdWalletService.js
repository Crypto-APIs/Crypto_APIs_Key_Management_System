'use strict';

const Cryptoapis = require("cryptoapis");

class HdWalletService {

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
     * @param {string} context
     * @returns {Promise<void>}
     */
    async syncHDWalletXPubYPubZPub(context = '') {
        const item = new Cryptoapis.SyncHDWalletXPubYPubZPubRBDataItem(this.extendedPublicKey);
        const postData = new Cryptoapis.SyncHDWalletXPubYPubZPubRBData(item);

        let opts = {
            'context': context,
            'syncHDWalletXPubYPubZPubRB': new Cryptoapis.SyncHDWalletXPubYPubZPubRB(postData)
        };

        // try {
            return this.apiInstance.syncHDWalletXPubYPubZPub(this.blockchain, this.network, opts)

                // .then((data) => {
                //     console.info('API called successfully. Returned data: ' + data);
                // })
            // , (error) => {
            //     console.debug(opts);
            //     resolve('foo');
            //     // console.log(error);
            // });
        // } catch (error) {
        //     console.log('err:');
        //     console.log(error);
        // }
    }
}

module.exports = HdWalletService;