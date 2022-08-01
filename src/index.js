'use strict';

const KmsClient = require('./kmsClient')
    , {blockchains: BlockchainsEnum} = require('./enumerations/blockchains')
    , {NETWORKS: NetworksEnum} = require('./enumerations/networks')
    , {
        XPUB_DERIVATION_PATHS: xPubDerivationPathsEnum,
        XPUB_DERIVATION_TYPES: xPubDerivationTypesEnum
    } = require('./helpers/xpubFormatsHelper')

module.exports = {
    blockchains: BlockchainsEnum,
    networks: NetworksEnum,
    xPubDerivationPaths: xPubDerivationPathsEnum,
    xPubDerivationTypes: xPubDerivationTypesEnum,
    client: KmsClient
};
