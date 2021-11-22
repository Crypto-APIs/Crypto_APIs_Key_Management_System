'use strict';

const BLOCKCHAIN_BITCOIN = 'bitcoin';
const BLOCKCHAIN_LITECOIN = 'litecoin';
const BLOCKCHAIN_BITCOIN_CASH = 'bitcoin-cash';
const BLOCKCHAIN_DOGECOIN = 'dogecoin';
const BLOCKCHAIN_DASH = 'dash';
const BLOCKCHAIN_BITCOIN_VAULT = 'bitcoin-vault';
const BLOCKCHAIN_ETHEREUM = 'ethereum';
const BLOCKCHAIN_ETHEREUM_CLASSIC = 'ethereum-classic';
const BLOCKCHAIN_RIPPLE = 'ripple';
const BLOCKCHAIN_ZILLIQA = 'zilliqa';
const BLOCKCHAIN_BINANCE_SMART_CHAIN = 'binance-smart-chain';

module.exports = {
    BLOCKCHAINS: {
        'BLOCKCHAIN_BITCOIN': BLOCKCHAIN_BITCOIN,
        'BLOCKCHAIN_LITECOIN': BLOCKCHAIN_LITECOIN,
        'BLOCKCHAIN_BITCOIN_CASH': BLOCKCHAIN_BITCOIN_CASH,
        'BLOCKCHAIN_BITCOIN_VAULT': BLOCKCHAIN_BITCOIN_VAULT,
        'BLOCKCHAIN_DOGECOIN': BLOCKCHAIN_DOGECOIN,
        'BLOCKCHAIN_DASH': BLOCKCHAIN_DASH,
        'BLOCKCHAIN_ETHEREUM': BLOCKCHAIN_ETHEREUM,
        'BLOCKCHAIN_ETHEREUM_CLASSIC': BLOCKCHAIN_ETHEREUM_CLASSIC,
        'BLOCKCHAIN_RIPPLE': BLOCKCHAIN_RIPPLE,
        'BLOCKCHAIN_ZILLIQA': BLOCKCHAIN_ZILLIQA,
        'BLOCKCHAIN_BINANCE_SMART_CHAIN': BLOCKCHAIN_BINANCE_SMART_CHAIN
    },
    mapIncomingBlockchain: function (blockchain) {
        let mappedBlockchain = null;
        switch (blockchain) {
            case 'BITCOIN':
                mappedBlockchain = 'BLOCKCHAIN_BITCOIN';
                break;
            case 'LITECOIN':
                mappedBlockchain = 'BLOCKCHAIN_LITECOIN';
                break;
            case 'BITCOIN_CASH':
                mappedBlockchain = 'BLOCKCHAIN_BITCOIN_CASH';
                break;
            case 'DOGECOIN':
                mappedBlockchain = 'BLOCKCHAIN_DOGECOIN';
                break;
            case 'DASH':
                mappedBlockchain = 'BLOCKCHAIN_DASH';
                break;
            case 'BITCOIN_VAULT':
                mappedBlockchain = 'BLOCKCHAIN_BITCOIN_VAULT';
                break;
            case 'ETHEREUM':
                mappedBlockchain = 'BLOCKCHAIN_ETHEREUM';
                break;
            case 'ETHEREUM_CLASSIC':
                mappedBlockchain = 'BLOCKCHAIN_ETHEREUM_CLASSIC';
                break;
            case 'XRP':
                mappedBlockchain = 'BLOCKCHAIN_RIPPLE';
                break;
            case 'ZILLIQA':
                mappedBlockchain = 'BLOCKCHAIN_ZILLIQA';
                break;
            case 'BINANCE_SMART_CHAIN':
                mappedBlockchain = 'BINANCE_SMART_CHAIN';
                break;
            default:
                throw new Error("Invalid blockchain");
        }

        return mappedBlockchain;
    }
};