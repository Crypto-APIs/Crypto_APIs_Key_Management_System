'use strict';

const BaseService = require("./baseService");

/**
 * HdAddressesService.
 *
 * @class HdAddressesService
 * @extends {BaseService}
 */
class HdAddressesService extends BaseService {
    /**
     * @param {object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)
        this.apiInstance = new this._cryptoApis.FeaturesApi();
    }

    /**
     * @param {string} exPub
     * @param {{context: String, addressFormat: String, addressesCount: Number, isChange: Boolean, startIndex: Number}|{}} opts Optional parameters
     * @param {String} opts.context In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user.
     * @param {String} opts.addressFormat Represents the format of the address.
     * @param {Number} opts.addressesCount Represents the addresses count.
     * @param {Boolean} opts.isChange Defines if the specific address is a change or deposit address. If the value is True - it is a change address, if it is False - it is a Deposit address.
     * @param {Number} opts.startIndex The starting index of the response items, i.e. where the response should start listing the returned items.
     * @returns {syncHDWalletXPubYPubZPub}
     */
    async deriveHDWalletXPubYPubZPubChangeOrReceivingAddresses(exPub, opts) {

        return this.apiInstance.deriveHDWalletXPubYPubZPubChangeOrReceivingAddresses(this.blockchain, exPub, this.network, opts);
    }
}

module.exports = HdAddressesService;