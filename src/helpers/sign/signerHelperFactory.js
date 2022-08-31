'use strict';

const EthSignerHelper = require('./ethSignerHelper')
    , BtcSignerHelper = require('./btcSignerHelper')
    , {blockchains} = require('../../enumerations/blockchainEnum')
;

class SignerHelperFactory {
    /**
     * @param {string} blockchain
     * @param {string} network
     *
     * @returns {BaseSignerHelper}
     */
    static create({blockchain, network}) {
        const args = {
            blockchain,
            network
        }

        switch (blockchain.toLowerCase()) {
            case blockchains.BITCOIN:
                return new BtcSignerHelper(args);
            case blockchains.ETHEREUM:
                return new EthSignerHelper(args);
            default:
                throw new Error('Blockchain signer type not supported');
        }
    }
}

module.exports = SignerHelperFactory;