'use strict'

const {blockchainEnum} = require('../enumerations/blockchainEnum')
    , {
        NETWORKS_CONFIGS: NetworksConfigsEnum,
        NETWORKS: NetworksEnum
    } = require('../enumerations/networkEnum')
    , bip32 = require('hdkey')
;

const XPUB_DERIVATION_TYPE_BIP44 = "BIP44";
const XPUB_DERIVATION_TYPE_BIP49 = "BIP49";
const XPUB_DERIVATION_TYPE_BIP84 = "BIP84";
const XPUB_DERIVATION_PATHS = {
    [blockchainEnum.BITCOIN]: {
        [NetworksEnum[blockchainEnum.BITCOIN]['NETWORK_BITCOIN_MAINNET']]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[blockchainEnum.BITCOIN]["NETWORK_BITCOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [blockchainEnum.LITECOIN]: {
        [NetworksEnum[blockchainEnum.LITECOIN]["NETWORK_LITECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/2'/0'",
        },
        [NetworksEnum[blockchainEnum.LITECOIN]["NETWORK_LITECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [blockchainEnum.DOGECOIN]: {
        [NetworksEnum[blockchainEnum.DOGECOIN]["NETWORK_DOGECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/3'/0'",
        },
        [NetworksEnum[blockchainEnum.DOGECOIN]["NETWORK_DOGECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.DASH]: {
        [NetworksEnum[blockchainEnum.DASH]["NETWORK_DASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/5'/0'",
        },
        [NetworksEnum[blockchainEnum.DASH]["NETWORK_DASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.BITCOIN_CASH]: {
        [NetworksEnum[blockchainEnum.BITCOIN_CASH]["NETWORK_BITCOIN_CASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/145'/0'",
        },
        [NetworksEnum[blockchainEnum.BITCOIN_CASH]["NETWORK_BITCOIN_CASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.ETHEREUM]: {
        [NetworksEnum[blockchainEnum.ETHEREUM]["NETWORK_ETHEREUM_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[blockchainEnum.ETHEREUM]["NETWORK_ETHEREUM_GOERLI"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.ETHEREUM_CLASSIC]: {
        [NetworksEnum[blockchainEnum.ETHEREUM_CLASSIC]["NETWORK_ETHEREUM_CLASSIC_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/61'/0'",
        },
        [NetworksEnum[blockchainEnum.ETHEREUM_CLASSIC]["NETWORK_ETHEREUM_CLASSIC_MORDOR"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.BINANCE_SMART_CHAIN]: {
        [NetworksEnum[blockchainEnum.BINANCE_SMART_CHAIN]["NETWORK_BINANCE_SMART_CHAIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[blockchainEnum.BINANCE_SMART_CHAIN]["NETWORK_BINANCE_SMART_CHAIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchainEnum.ZCASH]: {
        [NetworksEnum[blockchainEnum.ZCASH]["NETWORK_ZCASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/133'/0'",
        },
        [NetworksEnum[blockchainEnum.ZCASH]["NETWORK_ZCASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    }
};

const XPUB_DERIVATION_TYPES = {
    [blockchainEnum.BITCOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.BITCOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
        [XPUB_DERIVATION_TYPE_BIP49]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.BITCOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP49];
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip49);
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP49,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
        [XPUB_DERIVATION_TYPE_BIP84]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.BITCOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP84];
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip84);
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP84,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
    },
    [blockchainEnum.LITECOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.LITECOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },

        [XPUB_DERIVATION_TYPE_BIP49]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.LITECOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP49];
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip49);
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP49,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
        [XPUB_DERIVATION_TYPE_BIP84]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.LITECOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP84];
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip84);
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP84,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
    },
    [blockchainEnum.BITCOIN_CASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.BITCOIN_CASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.BITCOIN_CASH][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.DOGECOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.DOGECOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.DOGECOIN][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.DASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.DASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.DASH][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.ETHEREUM]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.ETHEREUM]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.ETHEREUM][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.ETHEREUM_CLASSIC]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.ETHEREUM_CLASSIC]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.ETHEREUM_CLASSIC][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.BINANCE_SMART_CHAIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.BINANCE_SMART_CHAIN]][network];
           
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.BINANCE_SMART_CHAIN][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        }
    },
    [blockchainEnum.ZCASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchainEnum.ZCASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchainEnum.ZCASH][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
        }
    }
},
};

module.exports = {
    'XPUB_DERIVATION_PATHS': XPUB_DERIVATION_PATHS,
    'XPUB_DERIVATION_TYPES': XPUB_DERIVATION_TYPES
}