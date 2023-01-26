'use strict';

const {STANDARDS: token} = require('../../../enumerations/tokenEnum')
    , ERC20TokenPrepareTransaction = require('./erc20TokenPrepare')
    , ERC721TokenPrepareTransaction = require('./erc721TokenPrepare')
;

class TokenPrepareHelperFactory {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     * @param {string} tokenStandard
     *
     * @returns {BasePrepareHelper}
     */
    static create({cryptoApis, blockchain, network, tokenStandard}) {

        switch (tokenStandard.toLowerCase()) {
            case token.ERC_20:
            case token.BEP_20:
                return new ERC20TokenPrepareTransaction(cryptoApis, blockchain, network);
            case token.ERC_721:
            case token.BEP_721:
                return new ERC721TokenPrepareTransaction(cryptoApis, blockchain, network);
            default:
                throw new Error('Token standard type not supported');
        }
    }
}

module.exports = TokenPrepareHelperFactory;