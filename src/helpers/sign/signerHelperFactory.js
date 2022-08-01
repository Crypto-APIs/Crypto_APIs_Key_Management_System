'use strict';

const EthSigner = require('./ethSignerHelper')
    , BtcSigner = require('./btcSignerHelper')
    , {blockchains} = require('../../enumerations/blockchains')
;

class SignerHelperFactory {
    /**
     * @param {string} blockchain
     * @param {string} network
     *
     * @returns {BaseSigner|Error}
     */
    static create({blockchain, network}) {
        const args = {
            blockchain,
            network
        }

        switch (blockchain.toLowerCase()) {
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