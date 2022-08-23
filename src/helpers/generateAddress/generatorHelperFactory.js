'use strict';

const BtcGeneratorHelper = require('./btcGeneratorHelper')
    , EthGeneratorHelper = require('./ethGeneratorHelper')
    , BscGeneratorHelper = require('./bscGeneratorHelper')
    , EtcGeneratorHelper = require('./bscGeneratorHelper')
    , ZcashGeneratorHelper = require('./zcashGeneratorHelper')
    , {blockchainEnum} = require('../../enumerations/blockchainEnum')
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
            case blockchainEnum.BITCOIN:
                return new BtcGeneratorHelper(args);
            case blockchainEnum.ETHEREUM:
                return new EthGeneratorHelper(args);
            case blockchainEnum.BINANCE_SMART_CHAIN:
                return new BscGeneratorHelper(args);
            case blockchainEnum.ETHEREUM_CLASSIC:
                return new EtcGeneratorHelper(args);
            case blockchainEnum.ZCASH:
                return new ZcashGeneratorHelper(args);
            default:
                return new Error('Blockchain signer type not supported');
        }
    }
}

module.exports = GeneratorHelperFactory;