'use strict';

const enumerations = require("../enumerations/blockchainEnum")
    , errors = require('./customErrors');

module.exports = function validateBlockchain(chain) {
    const blockchainsEnum = enumerations.blockchains;
    const validBlockchain = blockchainsEnum.hasOwnProperty(chain.toUpperCase());

    if (validBlockchain === false) {
        let blockchainsList = Object.keys(blockchainsEnum).map(function (k) {
            return blockchainsEnum[k]
        }).join(", ");

        throw errors.getErrorMessage('INVALID_BLOCKCHAIN', {'blockchains': blockchainsList});
    }

    return true;
}