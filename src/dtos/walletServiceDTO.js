'use strict';

class WalletServiceDTO {

    /**
     * @param dataObj
     * @returns {WalletServiceDTO}
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
     * @returns {string}
     */
    get xpubsList() {
        return this.data.xpubsList;
    }

    /**
     * @returns {string}
     */
    get xpub() {
        return this.data.xpubsList[0];
    }

    /**
     * @returns {string}
     */
    get ypub() {
        return this.data.xpubsList[1];
    }

    /**
     * @returns {string}
     */
    get zpub() {
        return this.data.xpubsList[1];
    }
}

module.exports = WalletServiceDTO;