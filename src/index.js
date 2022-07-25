'use strict';

const KmsClient = require('./kmsClient')
    , {blockchains: BlockchainsEnum} = require('./enumerations/blockchains')
    , {NETWORKS: NetworksEnum} = require('./enumerations/networks')
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
