'use strict';

const KmsClient = require('./kmsClient')
    , {blockchainEnum} = require('./enumerations/blockchainEnum')
    , {NETWORKS: networkEnum} = require('./enumerations/networkEnum')
    , {
        XPUB_DERIVATION_PATHS: xPubDerivationPathsEnum,
        XPUB_DERIVATION_TYPES: xPubDerivationTypesEnum
    } = require('./helpers/xpubFormatsHelper')
    , {
        WalletService,
        SignService,
        AddressService
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
        SignService: SignService,
        AddressService: AddressService
    },
    Client: KmsClient,
};
