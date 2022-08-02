'use strict';

const KmsClient = require('./kmsClient')
    , {blockchains: blockchainEnum} = require('./enumerations/blockchainEnum')
    , {NETWORKS: networkEnum} = require('./enumerations/networkEnum')
    , {
        XPUB_DERIVATION_PATHS: xPubDerivationPathsEnum,
        XPUB_DERIVATION_TYPES: xPubDerivationTypesEnum
    } = require('./helpers/xpubFormatsHelper')
    , {
        WalletService,
        SignService
    } = require('./services')
;

module.exports = {
    Enumerations: {
        Blockchains: blockchainEnum,
        Networks: networkEnum,
        xPubDerivationPaths: xPubDerivationPathsEnum,
        xPubDerivationTypes: xPubDerivationTypesEnum,
    },
    Services: {
        WalletService: WalletService,
        SignService: SignService
    },
    Client: KmsClient,
};
