'use strict';

const EthSignerHelper = require('./ethSignerHelper')
    , BtcSignerHelper = require('./btcSignerHelper')
    , EtcSignerHelper = require('./etcSignerHelper')
    , BscSignerHelper = require('./bscSignerHelper')
    , BchSignerHelper = require('./bchSignerHelper')
    , LtcSignerHelper = require('./ltcSignerHelper')
    , DogecoinSignerHelper = require('./dogecoinSignerHelper')
    , DashSignerHelper = require('./dashSignerHelper')
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
        };

        switch (blockchain.toLowerCase()) {
            case blockchains.BITCOIN:
                return new BtcSignerHelper(args);
            case blockchains.ETHEREUM:
                return new EthSignerHelper(args);
            case blockchains.ETHEREUM_CLASSIC:
                return new EtcSignerHelper(args);
            case blockchains.BINANCE_SMART_CHAIN:
                return new BscSignerHelper(args);
            case blockchains.BITCOIN_CASH:
                return new BchSignerHelper(args);
            case blockchains.LITECOIN:
                return new LtcSignerHelper(args);
            case blockchains.DOGECOIN:
                return new DogecoinSignerHelper(args);
            case blockchains.DASH:
                return new DashSignerHelper(args);
            default:
                throw new Error('Blockchain signer type not supported');
        }
    }
}

module.exports = SignerHelperFactory;