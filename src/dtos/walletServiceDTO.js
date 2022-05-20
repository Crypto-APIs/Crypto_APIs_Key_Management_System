'use strict';

const baseDTO = require('./baseDTO');

class WalletServiceDTO extends baseDTO {

    /**
     * @param {Object} dataObj
     * @returns {WalletServiceDTO}
     */
    constructor(dataObj) {
        super(dataObj);

        return this;
    }

    /**
     * @returns {string}
     */
    get blockchain() {
        return this._data.blockchain;
    }

    /**
     * @returns {string}
     */
    get network() {
        return this._data.network;
    }

    /**
     * @returns {string}
     */
    get mnemonic() {
        return this._data.mnemonic;
    }

    /**
     * @returns {string}
     */
    get seed() {
        return this._data.seed;
    }

    /**
     * @returns {Array}
     */
    get xpubsList() {
        return this._data.xpubsList;
    }

    /**
     * @returns {string}
     */
    get xpub() {
        return this._data.xpubsList[0];
    }

    /**
     * @returns {string}
     */
    get ypub() {
        return this._data.xpubsList[1];
    }

    /**
     * @returns {string}
     */
    get zpub() {
        return this._data.xpubsList[2];
    }
}

module.exports = WalletServiceDTO;