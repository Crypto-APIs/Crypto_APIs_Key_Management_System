'use strict';

const {blockchainEnum, reversed} = require("../enumerations/blockchainEnum")
    , ErrorDTO = require("../dtos/errorDTO")
;

module.exports = function validateBlockchain(blockchain) {
    const validBlockchain = blockchainEnum.hasOwnProperty(reversed[blockchain]);

    if (validBlockchain === false) {
        const blockchainsList = Object.keys(blockchainEnum).map((k) => {
            return blockchainEnum[k]
        }).join(", ");

        return new ErrorDTO('INVALID_BLOCKCHAIN', {'blockchains': blockchainsList});
    }

    return true;
}