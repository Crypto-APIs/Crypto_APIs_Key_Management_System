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
    getBlockchain() {
        return this.data.blockchain;
    }

    /**
     * @returns {string}
     */
    getNetwork() {
        return this.data.network;
    }

    /**
     * @returns {string}
     */
    getMnemonic() {
        return this.data.mnemonic;
    }

    /**
     * @returns {string}
     */
    getSeed() {
        return this.data.seed;
    }

    /**
     * @returns {string}
     */
    getXpubsList() {
        return this.data.xpubsList;
    }

    /**
     * @returns {string}
     */
    getXpub() {
        return this.data.xpubsList[0];
    }

    /**
     * @returns {string}
     */
    getYpub() {
        return this.data.xpubsList[1];
    }

    /**
     * @returns {string}
     */
    getZpub() {
        return this.data.xpubsList[1];
    }
}

module.exports = WalletServiceDTO;