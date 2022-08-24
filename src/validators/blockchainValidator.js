'use strict';

const {blockchains, reversed} = require("../enumerations/blockchainEnum")
    , ErrorDTO = require("../dtos/errorDTO")
;

module.exports = function validateBlockchain(blockchain) {
    const validBlockchain = blockchains.hasOwnProperty(reversed[blockchain]);

    if (validBlockchain === false) {
        const blockchainsList = Object.keys(blockchains).map((k) => {
            return blockchains[k]
        }).join(", ");

        return new ErrorDTO('INVALID_BLOCKCHAIN', {'blockchains': blockchainsList});
    }

    return true;
}