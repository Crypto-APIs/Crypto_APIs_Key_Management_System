'use strict';

const BaseSigner = require('./baseSignerHelper');

/**
 * BtcSigner
 *
 * @class BtcSigner
 * @extends {BaseSigner}
 */
class BtcSigner extends BaseSigner {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        super({blockchain, network})
    }

    /**
     * @inheritDoc
     */
    sign({key, transaction, options = {}}) {
        console.log('btc signer');
        return {
            id: 'btc',
            raw: "0xABC123"
        }
    };
}

module.exports = BtcSigner;