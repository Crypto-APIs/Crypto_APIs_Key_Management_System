'use strict'

const {blockchains} = require('../enumerations/blockchainEnum')
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
    [blockchains.BITCOIN]: {
        [NetworksEnum[blockchains.BITCOIN]['NETWORK_BITCOIN_MAINNET']]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[blockchains.BITCOIN]["NETWORK_BITCOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [blockchains.LITECOIN]: {
        [NetworksEnum[blockchains.LITECOIN]["NETWORK_LITECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/2'/0'",
        },
        [NetworksEnum[blockchains.LITECOIN]["NETWORK_LITECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [blockchains.DOGECOIN]: {
        [NetworksEnum[blockchains.DOGECOIN]["NETWORK_DOGECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/3'/0'",
        },
        [NetworksEnum[blockchains.DOGECOIN]["NETWORK_DOGECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.DASH]: {
        [NetworksEnum[blockchains.DASH]["NETWORK_DASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/5'/0'",
        },
        [NetworksEnum[blockchains.DASH]["NETWORK_DASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.BITCOIN_CASH]: {
        [NetworksEnum[blockchains.BITCOIN_CASH]["NETWORK_BITCOIN_CASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/145'/0'",
        },
        [NetworksEnum[blockchains.BITCOIN_CASH]["NETWORK_BITCOIN_CASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.ETHEREUM]: {
        [NetworksEnum[blockchains.ETHEREUM]["NETWORK_ETHEREUM_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[blockchains.ETHEREUM]["NETWORK_ETHEREUM_GOERLI"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.ETHEREUM_CLASSIC]: {
        [NetworksEnum[blockchains.ETHEREUM_CLASSIC]["NETWORK_ETHEREUM_CLASSIC_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/61'/0'",
        },
        [NetworksEnum[blockchains.ETHEREUM_CLASSIC]["NETWORK_ETHEREUM_CLASSIC_MORDOR"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.BINANCE_SMART_CHAIN]: {
        [NetworksEnum[blockchains.BINANCE_SMART_CHAIN]["NETWORK_BINANCE_SMART_CHAIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[blockchains.BINANCE_SMART_CHAIN]["NETWORK_BINANCE_SMART_CHAIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [blockchains.ZCASH]: {
        [NetworksEnum[blockchains.ZCASH]["NETWORK_ZCASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/133'/0'",
        },
        [NetworksEnum[blockchains.ZCASH]["NETWORK_ZCASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    }
};

const XPUB_DERIVATION_TYPES = {
    [blockchains.BITCOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.BITCOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP44];
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
            let networkConfig = NetworksConfigsEnum[[blockchains.BITCOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP49];
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
            let networkConfig = NetworksConfigsEnum[[blockchains.BITCOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.BITCOIN][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [blockchains.LITECOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.LITECOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP44];
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
            let networkConfig = NetworksConfigsEnum[[blockchains.LITECOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP49];
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
            let networkConfig = NetworksConfigsEnum[[blockchains.LITECOIN]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.LITECOIN][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [blockchains.BITCOIN_CASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.BITCOIN_CASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.BITCOIN_CASH][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.DOGECOIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.DOGECOIN]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.DOGECOIN][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.DASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.DASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.DASH][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.ETHEREUM]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.ETHEREUM]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.ETHEREUM][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.ETHEREUM_CLASSIC]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.ETHEREUM_CLASSIC]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.ETHEREUM_CLASSIC][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.BINANCE_SMART_CHAIN]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.BINANCE_SMART_CHAIN]][network];
           
            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.BINANCE_SMART_CHAIN][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [blockchains.ZCASH]: {
        [XPUB_DERIVATION_TYPE_BIP44]: (seed, network) => {
            let networkConfig = NetworksConfigsEnum[[blockchains.ZCASH]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[blockchains.ZCASH][network][XPUB_DERIVATION_TYPE_BIP44];
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