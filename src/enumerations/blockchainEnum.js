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
const TRX = 'trx';


const blockchains = {
    BITCOIN: BITCOIN,
    BITCOIN_CASH: BITCOIN_CASH,
    LITECOIN: LITECOIN,
    DOGECOIN: DOGECOIN,
    DASH: DASH,
    ETHEREUM: ETHEREUM,
    ETHEREUM_CLASSIC: ETHEREUM_CLASSIC,
    XRP: XRP,
    TRX: TRX,
    BINANCE_SMART_CHAIN: BINANCE_SMART_CHAIN,
    ZCASH: ZCASH
};

module.exports = {
    blockchains,
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
        [TRX]: 'TRX',
    }
};
