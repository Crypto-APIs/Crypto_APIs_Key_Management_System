'use strict';

const BtcGeneratorHelper = require('./btcGeneratorHelper')
    , EthGeneratorHelper = require('./ethGeneratorHelper')
    , BscGeneratorHelper = require('./bscGeneratorHelper')
    , EtcGeneratorHelper = require('./bscGeneratorHelper')
    , ZcashGeneratorHelper = require('./zcashGeneratorHelper')
    , {blockchains} = require('../../enumerations/blockchainEnum')
;

class GeneratorHelperFactory {
    /**
     * @param {string} blockchain
     * @param {string} network
     *
     * @returns {BaseGeneratorHelper|Error}
     */
    static create({blockchain, network}) {
        const args = {
            blockchain,
            network
        }

        switch (blockchain.toLowerCase()) {
            case blockchains.BITCOIN:
                return new BtcGeneratorHelper(args);
            case blockchains.ETHEREUM:
                return new EthGeneratorHelper(args);
            case blockchains.BINANCE_SMART_CHAIN:
                return new BscGeneratorHelper(args);
            case blockchains.ETHEREUM_CLASSIC:
                return new EtcGeneratorHelper(args);
            case blockchains.ZCASH:
                return new ZcashGeneratorHelper(args);
            default:
                throw new Error('Blockchain not supported');
        }
    }
}

module.exports = GeneratorHelperFactory;