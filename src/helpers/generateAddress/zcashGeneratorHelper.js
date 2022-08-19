'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , {Address, Networks, PublicKey} = require('zcashcore-lib')
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
    generateAddressFromPublicKey({publicKey}) {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const bitcoreNetwork = Networks[this.network];

        return Address.fromPublicKey(new PublicKey(publicKeyBuffer, {network: bitcoreNetwork}), bitcoreNetwork).toString();
    };
}

module.exports = ZcashGeneratorHelper;