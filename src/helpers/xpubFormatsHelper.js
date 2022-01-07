'use strict'

const {NETWORKS_CONFIGS: NetworksConfigsEnum, NETWORKS: NetworksEnum} = require('../enumerations/networksEnum')
    , {blockchains: BlockchainsEnum} = require('../enumerations/blockchainEnum')
    , bip32 = require('hdkey')
;

const XPUB_DERIVATION_TYPE_BIP44 = "BIP44";
const XPUB_DERIVATION_TYPE_BIP49 = "BIP49";
const XPUB_DERIVATION_TYPE_BIP84 = "BIP84";

const XPUB_DERIVATION_PATHS = {
    [BlockchainsEnum['BITCOIN']]: {
        [NetworksEnum[BlockchainsEnum['BITCOIN']]["NETWORK_BITCOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BITCOIN']]["NETWORK_BITCOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['LITECOIN']]: {
        [NetworksEnum[BlockchainsEnum['LITECOIN']]["NETWORK_LITECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/2'/0'",
        },
        [NetworksEnum[BlockchainsEnum['LITECOIN']]["NETWORK_LITECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['DOGECOIN']]: {
        [NetworksEnum[BlockchainsEnum['DOGECOIN']]["NETWORK_DOGECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/3'/0'",
        },
        [NetworksEnum[BlockchainsEnum['DOGECOIN']]["NETWORK_DOGECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['DASH']]: {
        [NetworksEnum[BlockchainsEnum['DASH']]["NETWORK_DASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/5'/0'",
        },
        [NetworksEnum[BlockchainsEnum['DASH']]["NETWORK_DASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BITCOIN_CASH']]: {
        [NetworksEnum[BlockchainsEnum['BITCOIN_CASH']]["NETWORK_BITCOIN_CASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/145'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BITCOIN_CASH']]["NETWORK_BITCOIN_CASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BITCOIN_VAULT']]: {
        [NetworksEnum[BlockchainsEnum['BITCOIN_VAULT']]["NETWORK_BITCOIN_VAULT_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BITCOIN_VAULT']]["NETWORK_BITCOIN_VAULT_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['ETHEREUM']]: {
        [NetworksEnum[BlockchainsEnum['ETHEREUM']]["NETWORK_ETHEREUM_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[BlockchainsEnum['ETHEREUM']]["NETWORK_ETHEREUM_ROPSTEN"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['ETHEREUM_CLASSIC']]: {
        [NetworksEnum[BlockchainsEnum['ETHEREUM_CLASSIC']]["NETWORK_ETHEREUM_CLASSIC_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/61'/0'",
        },
        [NetworksEnum[BlockchainsEnum['ETHEREUM_CLASSIC']]["NETWORK_ETHEREUM_CLASSIC_MORDOR"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['RIPPLE']]: {
        [NetworksEnum[BlockchainsEnum['RIPPLE']]["NETWORK_RIPPLE_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/144'/0'",
        },
        [NetworksEnum[BlockchainsEnum['RIPPLE']]["NETWORK_RIPPLE_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['ZILLIQA']]: {
        [NetworksEnum[BlockchainsEnum['ZILLIQA']]["NETWORK_ZILLIQA_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['ZILLIQA']]["NETWORK_ZILLIQA_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    }
};

const XPUB_DERIVATION_TYPES = {
    [BlockchainsEnum['BITCOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
        [XPUB_DERIVATION_TYPE_BIP49]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP49];
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
        [XPUB_DERIVATION_TYPE_BIP84]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [BlockchainsEnum['LITECOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['LITECOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },

        [XPUB_DERIVATION_TYPE_BIP49]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['LITECOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP49];
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
        [XPUB_DERIVATION_TYPE_BIP84]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['LITECOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [BlockchainsEnum['BITCOIN_CASH']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN_CASH']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN_CASH']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['DOGECOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['DOGECOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['DOGECOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['DASH']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['DASH']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['DASH']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['ETHEREUM']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['ETHEREUM']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['ETHEREUM']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['ETHEREUM_CLASSIC']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['ETHEREUM_CLASSIC']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['ETHEREUM_CLASSIC']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['RIPPLE']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            const rootKey = bip32.fromMasterSeed(seed);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['RIPPLE']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['ZILLIQA']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            const rootKey = bip32.fromMasterSeed(seed);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['RIPPLE']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BITCOIN_VAULT']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN_VAULT']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP44];
            const accountXpriv = rootKey.derive(derivationPath);

            return {
                rootKey: rootKey.privateExtendedKey,
                derivationType: XPUB_DERIVATION_TYPE_BIP44,
                derivationPath: derivationPath,
                accountXpriv: accountXpriv.privateExtendedKey,
                accountXpub: accountXpriv.publicExtendedKey
            }
        },
        [XPUB_DERIVATION_TYPE_BIP49]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN_VAULT']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP49];
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
        [XPUB_DERIVATION_TYPE_BIP84]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BITCOIN_VAULT']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP84];
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
};

module.exports = {
    'XPUB_DERIVATION_PATHS': XPUB_DERIVATION_PATHS,
    'XPUB_DERIVATION_TYPES': XPUB_DERIVATION_TYPES
}