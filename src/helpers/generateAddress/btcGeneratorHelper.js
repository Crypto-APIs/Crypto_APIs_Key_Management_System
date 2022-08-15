'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , {payments} = require('bitcoinjs-lib')
;

/**
 * BtcGeneratorHelper
 *
 * @class BtcGeneratorHelper
 *
 * @extends {BaseGeneratorHelper}
 */
class BtcGeneratorHelper extends BaseGeneratorHelper {
    /**
     * @inheritDoc
     */
    generateAddressFromPublicKey({publicKey}) {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');

        return payments.p2wpkh({pubkey: publicKeyBuffer, network: this.networkConfig}).address;
    };
}

module.exports = BtcGeneratorHelper;