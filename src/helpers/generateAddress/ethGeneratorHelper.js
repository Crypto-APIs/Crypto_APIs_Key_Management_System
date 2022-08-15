'use strict';

const BaseGeneratorHelper = require('./baseGeneratorHelper')
    , {importPublic, Address} = require('ethereumjs-util')
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
    generateAddressFromPublicKey({publicKey}) {
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const importedPublicKey = importPublic(publicKeyBuffer);

        return Address.fromPublicKey(importedPublicKey).toString();
    };
}

module.exports = EthGeneratorHelper;