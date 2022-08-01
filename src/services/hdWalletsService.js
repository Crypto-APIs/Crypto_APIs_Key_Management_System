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
        this.hdWalletInstance = new this.cryptoApis.HDWalletsApi();
    }

    /**
     * Sync New HD Wallet (xPub yPub zPub)
     * Through this endpoint users can add a brand new xPub to the Crypto APIs system to be ready for deriving. Unlike our other similar endpoint “Sync HD Wallet (xPub, yPub, zPub)”, this endpoint does not create new addresses nor syncs old data.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/SyncNewHDWalletXPubYPubZPubR}
     */
    async syncNewHDWallet(extendedPublicKey, context) {
        const item = new this.cryptoApis.SyncHDWalletXPubYPubZPubRBDataItem(extendedPublicKey);
        const data = new this.cryptoApis.SyncHDWalletXPubYPubZPubRBData(item);

        const opts = {
            context: context,
            syncNewHDWalletXPubYPubZPubRB: new this.cryptoApis.SyncNewHDWalletXPubYPubZPubRB(data)
        };

        return this.hdWalletInstance.syncNewHDWalletXPubYPubZPub(this.blockchain, this.network, opts);
    }

    /**
     * Derive And Sync New Change Addresses
     * Through this endpoint users can derive 100 change addresses, starting from the last index we have data for, which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will start from index 0.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/DeriveAndSyncNewChangeAddressesR}
     */
    async deriveAndSyncNewChangeAddresses(extendedPublicKey, context) {
        const item = new this.cryptoApis.DeriveAndSyncNewChangeAddressesRBDataItem(extendedPublicKey)
        const data = new this.cryptoApis.DeriveAndSyncNewChangeAddressesRBData(item)
        const opts = {
            context: context,
            deriveAndSyncNewChangeAddressesRB: new this.cryptoApis.DeriveAndSyncNewChangeAddressesRB(data)
        }

        return this.hdWalletInstance.deriveAndSyncNewChangeAddresses(this.blockchain, this.network, opts);
    }

    /**
     * Derive And Sync New Receiving Addresses
     * Through this endpoint users can derive 100 receiving addresses, starting from the last index we have data for, which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will start from index 0.
     * @param {string} extendedPublicKey
     * @param {String|null} context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @returns {module:model/DeriveAndSyncNewReceivingAddressesR}
     */
    async deriveAndSyncNewReceivingAddresses(extendedPublicKey, context) {
        const item = new this.cryptoApis.DeriveAndSyncNewReceivingAddressesRBDataItem(extendedPublicKey)
        const data = new this.cryptoApis.DeriveAndSyncNewReceivingAddressesRBData(item)
        const opts = {
            context: context,
            deriveAndSyncNewReceivingAddressesRB: new this.cryptoApis.DeriveAndSyncNewReceivingAddressesRB(data)
        }

        return this.hdWalletInstance.deriveAndSyncNewReceivingAddresses(this.blockchain, this.network, opts);
    }

    /**
     * List Synced Addresses
     * Through this endpoint users can list all addresses that Crypto APIs has synced for a specific xPub. This includes previous and current/new xPubs, what addresses we’ve synced for them, etc.
     * @param {String} extendedPublicKey Defines the account extended publicly known key which is used to derive all child public keys.
     * @param {Object} opts Optional parameters
     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @param {Boolean} opts.isChangeAddress Defines if the address is change addres or not. (default to true)
     * @param {String} opts.addressFormat Represents the format of the address.
     * @returns {module:model/ListSyncedAddressesR}
     */
    listSyncedAddressesByXpub(extendedPublicKey, opts) {
        return this.hdWalletInstance.listSyncedAddresses(this.blockchain, extendedPublicKey, this.network, opts)
    }
}

module.exports = HdWalletsService;