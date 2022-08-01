'use strict';

const enumerations = require("../enumerations/blockchains")
    , ErrorDTO = require("../dtos/errorDTO");

module.exports = function validateBlockchain(chain) {
    const blockchainsEnum = enumerations.blockchains;
    const validBlockchain = blockchainsEnum.hasOwnProperty(chain.toUpperCase());

    if (validBlockchain === false) {
        const blockchainsList = Object.keys(blockchainsEnum).map((k) => {
            return blockchainsEnum[k]
        }).join(", ");

        return new ErrorDTO('INVALID_BLOCKCHAIN', {'blockchains': blockchainsList});
    }

    return true;
}