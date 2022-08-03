'use strict';

const EthSignerHelper = require('./ethSignerHelper')
    , BtcSignerHelper = require('./btcSignerHelper')
    , {blockchainEnum} = require('../../enumerations/blockchainEnum')
;

class SignerHelperFactory {
    /**
     * @param {string} blockchain
     * @param {string} network
     *
     * @returns {BaseSignerHelper|Error}
     */
    static create({blockchain, network}) {
        const args = {
            blockchain,
            network
        }

        switch (blockchain.toLowerCase()) {
            case blockchainEnum.BITCOIN:
                return new BtcSignerHelper(args);
            case blockchainEnum.ETHEREUM:
                return new EthSignerHelper(args);
            default:
                return new Error('Blockchain signer type not supported');
        }
    }
}

module.exports = SignerHelperFactory;