'use strict'

const {default: ethereumCommon} = require('@ethereumjs/common');
const {blockchains} = require('./blockchainEnum');

const NETWORK_BITCOIN_MAINNET = 'mainnet';
const NETWORK_BITCOIN_TESTNET = 'testnet';

const NETWORK_BITCOIN_CASH_MAINNET = 'mainnet';
const NETWORK_BITCOIN_CASH_TESTNET = 'testnet';

const NETWORK_LITECOIN_MAINNET = 'mainnet';
const NETWORK_LITECOIN_TESTNET = 'testnet';

const NETWORK_DOGECOIN_MAINNET = 'mainnet';
const NETWORK_DOGECOIN_TESTNET = 'testnet';

const NETWORK_DASH_MAINNET = 'mainnet';
const NETWORK_DASH_TESTNET = 'testnet';

const NETWORK_ETHEREUM_MAINNET = 'mainnet';
const NETWORK_ETHEREUM_GOERLI = 'goerli';

const NETWORK_ETHEREUM_CLASSIC_MAINNET = 'mainnet';
const NETWORK_ETHEREUM_CLASSIC_MORDOR = 'mordor';

const NETWORK_ZCASH_MAINNET = 'mainnet';
const NETWORK_ZCASH_TESTNET = 'testnet';

const NETWORK_XRP_MAINNET = 'mainnet';
const NETWORK_XRP_TESTNET = 'testnet';

const NETWORK_BINANCE_SMART_CHAIN_MAINNET = 'mainnet';
const NETWORK_BINANCE_SMART_CHAIN_TESTNET = 'testnet';

const NETWORKS_CONFIGS = {
    [blockchains.BITCOIN]: {
        [NETWORK_BITCOIN_MAINNET]: {
            messagePrefix: '\x18Bitcoin Signed Message:\n',
            bech32: 'bc',
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            },
            bip49: {
                public: 0x049d7cb2,
                private: 0x049d7878,
            },
            bip84: {
                public: 0x04b24746,
                private: 0x04b2430c,
            },
            pubKeyHash: 0x00,
            scriptHash: 0x05,
            wif: 0x80,
        },
        [NETWORK_BITCOIN_TESTNET]: {
            messagePrefix: '\x18Bitcoin Signed Message:\n',
            bech32: 'tb',
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
            bip49: {
                public: 0x044a5262,
                private: 0x044a4e28,
            },
            bip84: {
                public: 0x045f1cf6,
                private: 0x045f18bc,
            },
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            wif: 0xef,
        },
    },
    [blockchains.BITCOIN_CASH]: {
        [NETWORK_BITCOIN_CASH_MAINNET]: {
            messagePrefix: 'unused',
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            },
            pubKeyHash: 0x00,
            scriptHash: 0x05,
            wif: 0x80
        },
        [NETWORK_BITCOIN_CASH_TESTNET]: {
            messagePrefix: 'unused',
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            wif: 0xef,
        },
    },
    [blockchains.LITECOIN]: {
        [NETWORK_LITECOIN_MAINNET]: {
            bech32: 'ltc',
            messagePrefix: '\x19Litecoin Signed Message:\n',
            bip32: {
                public: 0x019da462,
                private: 0x019d9cfe,
            },
            bip49: {
                public: 0x01b26ef6,
                private: 0x01b26792,
            },
            bip84: {
                public: 0x04b24746,
                private: 0x04b2430c,
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0
        },
        [NETWORK_LITECOIN_TESTNET]: {
            bech32: 'tltc',
            messagePrefix: '\x18Litecoin Signed Message:\n',
            bip32: {
                public: 0x0436f6e1,
                private: 0x0436ef7d,
            },
            bip49: {
                public: 0x043587cf,
                private: 0x04358394,
            },
            bip84: {
                public: 0x045f1cf6,
                private: 0x045f18bc,
            },
            pubKeyHash: 0x6f,
            scriptHash: 0xc4,
            wif: 0xef,
        },
    },
    [blockchains.DASH]: {
        [NETWORK_DASH_MAINNET]: {
            messagePrefix: 'unused',
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4
            },
            pubKeyHash: 0x4c,
            scriptHash: 0x10,
            wif: 0xcc
        },
        [NETWORK_DASH_TESTNET]: {
            messagePrefix: 'unused',
            bip32: {
                public: 0x043587cf,
                private: 0x04358394
            },
            pubKeyHash: 0x8c,
            scriptHash: 0x13,
            wif: 0xef
        },
    },
    [blockchains.DOGECOIN]: {
        [NETWORK_DOGECOIN_MAINNET]: {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bip32: {
                public: 0x02facafd,
                private: 0x02fac398
            },
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            wif: 0x9e
        },
        [NETWORK_DOGECOIN_TESTNET]: {
            messagePrefix: '\x19Dogecoin Signed Message:\n',
            bip32: {
                public: 0x0432a9a8,
                private: 0x0432a243
            },
            pubKeyHash: 0x71,
            scriptHash: 0xc4,
            wif: 0xf1
        },
    },
    [blockchains.ETHEREUM]: {
        [NETWORK_ETHEREUM_MAINNET]: {
            common: new ethereumCommon({
                chain: 'mainnet',
                hardfork: 'london',
                networkId: 1,
                chainId: 1
            }),
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            }
        },
        [NETWORK_ETHEREUM_GOERLI]: {
            common: ethereumCommon.forCustomChain(
                'goerli',
                {
                    name: 'goerli',
                    networkId: 5,
                    chainId: 5,
                },
                'london'
            )
        },
    },
    [blockchains.ETHEREUM_CLASSIC]: {
        [NETWORK_ETHEREUM_CLASSIC_MAINNET]: {
            common: ethereumCommon.forCustomChain(
                'mainnet',
                {
                    name: 'mainnet',
                    networkId: 1,
                    chainId: 61,
                },
                'petersburg'
            ),
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            }
        },
        [NETWORK_ETHEREUM_CLASSIC_MORDOR]: {
            common: ethereumCommon.forCustomChain(
                'rinkeby',
                {
                    name: 'mordor',
                    networkId: 7,
                    chainId: 63,
                },
                'petersburg'
            ),
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            }
        },
    },
    [blockchains.BINANCE_SMART_CHAIN]: {
        [NETWORK_BINANCE_SMART_CHAIN_MAINNET]: {
            common: ethereumCommon.forCustomChain(
                'mainnet',
                {
                    name: 'mainnet',
                    networkId: 56,
                    chainId: 56,
                },
                'petersburg'
            ),
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            }
        },
        [NETWORK_BINANCE_SMART_CHAIN_TESTNET]: {
            common: ethereumCommon.forCustomChain(
                'ropsten',
                {
                    name: 'testnet',
                    networkId: 97,
                    chainId: 97,
                },
                'petersburg'
            )
        },
    },
    [blockchains.ZCASH]: {
        [NETWORK_ZCASH_MAINNET]: {
            messagePrefix: '\x19ZCash Signed Message:\n',
            bip32: {
                public: 0x0488b21e,
                private: 0x0488ade4,
            },
            pubKeyHash: 0x1cb8,
            scriptHash: 0x1cbd,
            wif: 0x80,
            consensusBranchId: {
                1: 0x00,
                2: 0x00,
                3: 0x5ba81b19,
                4: 0xE9FF75A6,
            },
            coin: 'zec'
        },
        [NETWORK_ZCASH_TESTNET]: {
            messagePrefix: '\x19ZCash Signed Message:\n',
            bip32: {
                public: 0x043587cf,
                private: 0x04358394,
            },
            pubKeyHash: 0x1d25,
            scriptHash: 0x1cba,
            wif: 0xef,
            consensusBranchId: {
                1: 0x00,
                2: 0x00,
                3: 0x5ba81b19,
                4: 0x37519621,
            },
            coin: 'zec'
        },
    },
};

module.exports = {
    'NETWORKS': {
        [blockchains.BITCOIN]: {
            'NETWORK_BITCOIN_MAINNET': NETWORK_BITCOIN_MAINNET,
            'NETWORK_BITCOIN_TESTNET': NETWORK_BITCOIN_TESTNET,
        },
        [blockchains.BITCOIN_CASH]: {
            'NETWORK_BITCOIN_CASH_MAINNET': NETWORK_BITCOIN_CASH_MAINNET,
            'NETWORK_BITCOIN_CASH_TESTNET': NETWORK_BITCOIN_CASH_TESTNET,
        },
        [blockchains.LITECOIN]: {
            'NETWORK_LITECOIN_MAINNET': NETWORK_LITECOIN_MAINNET,
            'NETWORK_LITECOIN_TESTNET': NETWORK_LITECOIN_TESTNET,
        },
        [blockchains.DOGECOIN]: {
            'NETWORK_DOGECOIN_MAINNET': NETWORK_DOGECOIN_MAINNET,
            'NETWORK_DOGECOIN_TESTNET': NETWORK_DOGECOIN_TESTNET,
        },
        [blockchains.DASH]: {
            'NETWORK_DASH_MAINNET': NETWORK_DASH_MAINNET,
            'NETWORK_DASH_TESTNET': NETWORK_DASH_TESTNET,
        },
        [blockchains.ETHEREUM]: {
            'NETWORK_ETHEREUM_MAINNET': NETWORK_ETHEREUM_MAINNET,
            'NETWORK_ETHEREUM_GOERLI': NETWORK_ETHEREUM_GOERLI,
        },
        [blockchains.ETHEREUM_CLASSIC]: {
            'NETWORK_ETHEREUM_CLASSIC_MAINNET': NETWORK_ETHEREUM_CLASSIC_MAINNET,
            'NETWORK_ETHEREUM_CLASSIC_MORDOR': NETWORK_ETHEREUM_CLASSIC_MORDOR,
        },
        [blockchains.BINANCE_SMART_CHAIN]: {
            'NETWORK_BINANCE_SMART_CHAIN_MAINNET': NETWORK_BINANCE_SMART_CHAIN_MAINNET,
            'NETWORK_BINANCE_SMART_CHAIN_TESTNET': NETWORK_BINANCE_SMART_CHAIN_TESTNET,
        },
        [blockchains.ZCASH]: {
            'NETWORK_ZCASH_MAINNET': NETWORK_ZCASH_MAINNET,
            'NETWORK_ZCASH_TESTNET': NETWORK_ZCASH_TESTNET,
        },
        [blockchains.XRP]: {
            'NETWORK_XRP_MAINNET': NETWORK_XRP_MAINNET,
            'NETWORK_XRP_TESTNET': NETWORK_XRP_TESTNET,
        },
    },
    'NETWORKS_CONFIGS': NETWORKS_CONFIGS,
}