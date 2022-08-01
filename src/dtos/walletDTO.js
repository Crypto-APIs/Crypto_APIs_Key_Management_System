'use strict';

class WalletDTO {

    /**
     * @param {Object} dataObj
     * @returns {WalletDTO}
     */
    constructor(dataObj) {
        this.data = dataObj;

        return this;
    }

    /**
     * @returns {string}
     */
    get blockchain() {
        return this.data.blockchain;
    }

    /**
     * @returns {string}
     */
    get network() {
        return this.data.network;
    }

    /**
     * @returns {string}
     */
    get mnemonic() {
        return this.data.mnemonic;
    }

    /**
     * @returns {string}
     */
    get seed() {
        return this.data.seed;
    }

    /**
     * @returns {Array}
     */
    get xPubsList() {
        return this.data.xPubsList;
    }

    /**
     * @returns {string}
     */
    get xPub() {
        return this.data.xPubsList[0];
    }

    /**
     * @returns {string}
     */
    get yPub() {
        return this.data.xPubsList[1];
    }

    /**
     * @returns {string}
     */
    get zPub() {
        return this.data.xPubsList[2];
    }
}

module.exports = WalletDTO;