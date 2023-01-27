'use strict';

const {blockchains} = require('./blockchainEnum');

const TYPE_ERC_20 = 'erc-20'
    , TYPE_BEP_20 = 'bep-20'
    , TYPE_ERC_721 = 'erc-721'
    , TYPE_BEP_721 = 'bep-721'
;

module.exports = {
    BLOCKCHAIN_STANDARDS: {
        [blockchains.ETHEREUM]: {
            ERC_20: TYPE_ERC_20,
            ERC_721: TYPE_ERC_721,
        },
        [blockchains.ETHEREUM_CLASSIC]: {
            ERC_20: TYPE_ERC_20,
        },
        [blockchains.BINANCE_SMART_CHAIN]: {
            BEP_20: TYPE_BEP_20,
            BEP_721: TYPE_BEP_721,
        },
    },
    STANDARDS: {
        ERC_20: TYPE_ERC_20,
        BEP_20: TYPE_BEP_20,
        ERC_721: TYPE_ERC_721,
        BEP_721: TYPE_BEP_721
    }
};
