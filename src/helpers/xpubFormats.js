'use strict'

const {NETWORKS_CONFIGS: NetworksConfigsEnum, NETWORKS: NetworksEnum} = require('../enumerations/networks')
    , {BLOCKCHAINS: BlockchainsEnum} = require('./blockchains')
    , bip32 = require('hdkey')
;

const XPUB_DERIVATION_TYPE_BIP44 = "BIP44";
const XPUB_DERIVATION_TYPE_BIP49 = "BIP49";
const XPUB_DERIVATION_TYPE_BIP84 = "BIP84";

const XPUB_DERIVATION_PATHS = {
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN']]["NETWORK_BITCOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN']]["NETWORK_BITCOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_LITECOIN']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_LITECOIN']]["NETWORK_LITECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/2'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/2'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_LITECOIN']]["NETWORK_LITECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_DOGECOIN']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_DOGECOIN']]["NETWORK_DOGECOIN_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/3'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_DOGECOIN']]["NETWORK_DOGECOIN_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_DASH']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_DASH']]["NETWORK_DASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/5'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_DASH']]["NETWORK_DASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']]["NETWORK_BITCOIN_CASH_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/145'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']]["NETWORK_BITCOIN_CASH_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]["NETWORK_BITCOIN_VAULT_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/0'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]["NETWORK_BITCOIN_VAULT_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP49]: "m/49'/1'/0'",
            [XPUB_DERIVATION_TYPE_BIP84]: "m/84'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]["NETWORK_ETHEREUM_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/60'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]["NETWORK_ETHEREUM_ROPSTEN"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]["NETWORK_ETHEREUM_RINKEBY"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']]["NETWORK_ETHEREUM_CLASSIC_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/61'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']]["NETWORK_ETHEREUM_CLASSIC_MORDOR"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_RIPPLE']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_RIPPLE']]["NETWORK_RIPPLE_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/144'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_RIPPLE']]["NETWORK_RIPPLE_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    },
    [BlockchainsEnum['BLOCKCHAIN_ZILLIQA']]: {
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ZILLIQA']]["NETWORK_ZILLIQA_MAINNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/0'/0'",
        },
        [NetworksEnum[BlockchainsEnum['BLOCKCHAIN_ZILLIQA']]["NETWORK_ZILLIQA_TESTNET"]]: {
            [XPUB_DERIVATION_TYPE_BIP44]: "m/44'/1'/0'",
        },
    }
};

const XPUB_DERIVATION_TYPES = {
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP49];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN']][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [BlockchainsEnum['BLOCKCHAIN_LITECOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_LITECOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_LITECOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP49];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_LITECOIN']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_LITECOIN']][network][XPUB_DERIVATION_TYPE_BIP84];
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
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN_CASH']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_DOGECOIN']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_DOGECOIN']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_DOGECOIN']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_DASH']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_DASH']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_DASH']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_ETHEREUM']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_ETHEREUM']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_ETHEREUM_CLASSIC']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_RIPPLE']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            const rootKey = bip32.fromMasterSeed(seed);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_RIPPLE']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_ZILLIQA']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            const rootKey = bip32.fromMasterSeed(seed);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_RIPPLE']][network][XPUB_DERIVATION_TYPE_BIP44];
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
    [BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]: {
        [XPUB_DERIVATION_TYPE_BIP44]: function (seed, network) {
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]][network];

            const rootKey = bip32.fromMasterSeed(seed, networkConfig.bip32);
            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP44];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP49];
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
            let networkConfig = NetworksConfigsEnum[[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']]][network];

            const derivationPath = XPUB_DERIVATION_PATHS[BlockchainsEnum['BLOCKCHAIN_BITCOIN_VAULT']][network][XPUB_DERIVATION_TYPE_BIP84];
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