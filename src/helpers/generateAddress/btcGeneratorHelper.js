'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , {payments} = require('bitcoinjs-lib')
    , ecc = require('tiny-secp256k1')
    , ecpair = require('ecpair')
    , ECPair = ecpair.ECPairFactory(ecc)
    , {AddressDTO} = require("../../dtos")
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
    generateAddress() {
        const pair = ECPair.makeRandom({network: this.networkConfig});
        const address = payments.p2wpkh({pubkey: pair.publicKey, network: this.networkConfig}).address

        return new AddressDTO({
            address: address,
            publicKey: pair.publicKey.toString('hex'),
            privateKey: pair.privateKey.toString('hex'),
        });
    };
}

module.exports = BtcGeneratorHelper;