'use strict';

class WalletServiceDTO {
    constructor(dataObj) {
        this.object = dataObj;

        return this;
    }

    getBlockchain() {
        return this.object.blockchain;
    }

    getNetwork() {
        return this.object.network;
    }

    getMnemonic() {
        return this.object.mnemonic;
    }

    getSeed() {
        return this.object.seed;
    }

    getXpubsList() {
        return this.object.xpubsList;
    }

    getXpub() {
        return this.object.xpubsList[0];
    }

    getYpub() {
        return this.object.xpubsList[1];
    }

    getZpub() {
        return this.object.xpubsList[1];
    }
}

module.exports = WalletServiceDTO;