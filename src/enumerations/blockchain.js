'use strict';

const blockchain = {
    BITCOIN: 'bitcoin',
    BITCOIN_CASH: 'bitcoin-cash',
    LITECOIN: 'litecoin',
    DOGECOIN: 'dogecoin',
    DASH: 'dash',
    BITCOIN_VAULT: 'bitcoin-vault',
    ETHEREUM: 'ethereum',
    ETHEREUM_CLASSIC: 'ethereum-classic',
    XRP: 'xrp',
    RIPPLE: 'ripple',
    ZILLIQA: 'zilliqa',
    BINANCE_SMART_CHAIN: 'binance-smart-chain',
};

module.exports.blockchains = blockchain;

module.exports.currencies = {
    [blockchain.BITCOIN]: 'BTC',
    [blockchain.BITCOIN_CASH]: 'BCH',
    [blockchain.LITECOIN]: 'LTC',
    [blockchain.DOGECOIN]: 'DOGE',
    [blockchain.DASH]: 'DASH',
    [blockchain.ETHEREUM]: 'ETH',
    [blockchain.ETHEREUM_CLASSIC]: 'ETC',
    [blockchain.XRP]: 'XRP',
    [blockchain.BINANCE_SMART_CHAIN]: 'BNB',
};

module.exports.networks = {
    [blockchain.BITCOIN]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
    [blockchain.BITCOIN_CASH]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
    [blockchain.DOGECOIN]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
    [blockchain.DASH]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
    [blockchain.LITECOIN]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
    [blockchain.ETHEREUM]: {
        MAINNET: 'mainnet',
        ROPSTEN: 'ropsten',
    },
    [blockchain.ETHEREUM_CLASSIC]: {
        MAINNET: 'mainnet',
        MORDOR: 'mordor',
    },
    [blockchain.XRP]: {
        MAINNET: 'mainnet',
        TESTNET: 'testnet',
    },
};
