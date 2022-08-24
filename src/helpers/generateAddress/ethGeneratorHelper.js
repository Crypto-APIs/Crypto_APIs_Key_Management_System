'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , ecc = require('tiny-secp256k1')
    , ecpair = require('ecpair')
    , ECPair = ecpair.ECPairFactory(ecc)
    , {importPublic, Address} = require('ethereumjs-util')
    , {AddressDTO} = require("../../dtos")
;

/**
 * EthGeneratorHelper
 *
 * @class EthGeneratorHelper
 *
 * @extends {BaseGeneratorHelper}
 */
class EthGeneratorHelper extends BaseGeneratorHelper {
    /**
     * @inheritDoc
     */
    generateAddress() {
        const pair = ECPair.makeRandom();
        const address = Address.fromPublicKey(importPublic(pair.publicKey)).toString();

        return new AddressDTO({
            address: address,
            publicKey: "0x" + publicKey.toString('hex'),
            privateKey: "0x" + pair.privateKey.toString('hex')
        });
    };
}

module.exports = EthGeneratorHelper;