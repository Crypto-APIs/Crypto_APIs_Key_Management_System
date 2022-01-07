'use strict';

const CryptoApisKms = require('./cryptoapisKms')
    , {blockchains: BlockchainsEnum} = require('./enumerations/blockchainEnum')
    , {NETWORKS: NetworksEnum} = require('./enumerations/networksEnum');

module.exports = {
    blockchains: BlockchainsEnum,
    networks: NetworksEnum,
    client: CryptoApisKms
};
