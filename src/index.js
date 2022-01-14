'use strict';

const KmsClient = require('./KmsClient')
    , {blockchains: BlockchainsEnum} = require('./enumerations/blockchainEnum')
    , {NETWORKS: NetworksEnum} = require('./enumerations/networksEnum')
    , {
        XPUB_DERIVATION_PATHS: XpubDerivationPathsEnum,
        XPUB_DERIVATION_TYPES: XpubDerivationTypesEnum
    } = require('./helpers/xpubFormatsHelper')

module.exports = {
    blockchains: BlockchainsEnum,
    networks: NetworksEnum,
    xpubDerivationPaths: XpubDerivationPathsEnum,
    xpubDerivationTypes: XpubDerivationTypesEnum,
    client: KmsClient
};
