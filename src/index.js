'use strict';

const KmsClient = require('./kmsClient')
    , {
        blockchainEnum,
        networkEnum,
        feePriorityEnum,
        prepareStrategyEnum
    } = require('./enumerations')
    , {
        XPUB_DERIVATION_PATHS: xPubDerivationPathsEnum,
        XPUB_DERIVATION_TYPES: xPubDerivationTypesEnum
    } = require('./helpers/xpubFormatsHelper')
    , {
        WalletService,
        SignService,
        AddressService
    } = require('./services')
    , {
        AccountBasedFeeOptionsModel,
        UTXOBasedFeeOptionsModel,
        RecipientModel
    } = require('./models')
;

module.exports = {
    Models: {
        AccountBasedFeeOptionsModel: AccountBasedFeeOptionsModel,
        UTXOBasedFeeOptionsModel: UTXOBasedFeeOptionsModel,
        RecipientModel: RecipientModel,
    },
    Enumerations: {
        Blockchains: blockchainEnum.blockchainEnum,
        Networks: networkEnum.NETWORKS,
        FeePriorities: feePriorityEnum,
        PrepareStrategies: prepareStrategyEnum,
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
