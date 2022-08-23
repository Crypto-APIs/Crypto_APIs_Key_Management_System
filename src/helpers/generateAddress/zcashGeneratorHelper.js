'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , {Address, Networks, PublicKey} = require('zcashcore-lib')
    , ecpair = require('ecpair')
    , ecc = require("tiny-secp256k1")
    , ECPair = ecpair.ECPairFactory(ecc)
    , {AddressDTO} = require("../../dtos")
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
    generateAddressFromPublicKey() {
        const pair = ECPair.makeRandom();
        const networkConfig = Networks[this.network];

        console.log('\n network', this.networkConfig)
        const address = Address.fromPublicKey(new PublicKey(pair.publicKey, {network: networkConfig}), networkConfig).toString();

        return new AddressDTO({
            address: address,
            publicKey: pair.publicKey.toString('hex'),
            privateKey: pair.privateKey.toString('hex'),
        });
    };
}

module.exports = ZcashGeneratorHelper;