'use strict';

const BITCOIN = 'bitcoin';
const BITCOIN_CASH = 'bitcoin-cash';
const LITECOIN = 'litecoin';
const DOGECOIN = 'dogecoin';
const DASH = 'dash';
const ETHEREUM = 'ethereum';
const ETHEREUM_CLASSIC = 'ethereum-classic';
const BINANCE_SMART_CHAIN = 'binance-smart-chain';
const XRP = 'xrp';
const ZCASH = 'zcash';

const blockchainEnum = {
    BITCOIN: BITCOIN,
    BITCOIN_CASH: BITCOIN_CASH,
    LITECOIN: LITECOIN,
    DOGECOIN: DOGECOIN,
    DASH: DASH,
    ETHEREUM: ETHEREUM,
    ETHEREUM_CLASSIC: ETHEREUM_CLASSIC,
    XRP: XRP,
    BINANCE_SMART_CHAIN: BINANCE_SMART_CHAIN,
    ZCASH: ZCASH
};

module.exports = {
    blockchainEnum,
    reversed: {
        [BITCOIN]: 'BITCOIN',
        [BITCOIN_CASH]: 'BITCOIN_CASH',
        [LITECOIN]: 'LITECOIN',
        [DOGECOIN]: 'DOGECOIN',
        [DASH]: 'DASH',
        [ETHEREUM]: 'ETHEREUM',
        [ETHEREUM_CLASSIC]: 'ETHEREUM_CLASSIC',
        [XRP]: 'XRP',
        [BINANCE_SMART_CHAIN]: 'BINANCE_SMART_CHAIN',
        [ZCASH]: 'ZCASH',
    }
};
