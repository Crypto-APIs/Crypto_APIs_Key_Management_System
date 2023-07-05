'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , ecpair = require('ecpair')
    , ecc = require('tiny-secp256k1')
    , ECPair = ecpair.ECPairFactory(ecc)
    , {AddressDTO} = require("../../dtos")
    , Base58 = require('./zcash/base58')
    , Hash = require('./zcash/hash')
;

/**
 * ZcashGeneratorHelper
 *
 * @class ZcashGeneratorHelper
 *
 * @extends {BaseGeneratorHelper}
 */
class ZcashGeneratorHelper extends BaseGeneratorHelper {
    /**
     * @inheritDoc
     */
    generateAddress() {
        const pair = ECPair.makeRandom();

        let version = Buffer.alloc(2);
        version.writeUInt16BE(this.networkConfig.pubKeyHash, 0);

        return new AddressDTO({
            address: Base58.encode(Buffer.concat([version, Hash.sha256ripemd160(pair.publicKey)])),
            publicKey: pair.publicKey.toString('hex'),
            privateKey: pair.privateKey.toString('hex'),
        });
    };
}

module.exports = ZcashGeneratorHelper;
