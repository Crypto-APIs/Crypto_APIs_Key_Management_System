'use strict';

const EthSigner = require('./ethSignerHelper')
    , BtcSigner = require('./btcSignerHelper')
    , {blockchains} = require('../../enumerations/blockchains')
;

class SignerHelperFactory {

    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @returns {Object}
     */
    create() {
        const args = {
            blockchain: this.blockchain,
            network: this.network
        }

        switch (this.blockchain.toLowerCase()) {
            case blockchains.BITCOIN:
                return new BtcSigner(args);
            case blockchains.ETHEREUM:
                return new EthSigner(args);
            default:
                return new Error('Blockchain signer type not supported');
        }
    }
}

module.exports = SignerHelperFactory;