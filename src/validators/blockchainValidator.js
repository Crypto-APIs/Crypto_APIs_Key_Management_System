'use strict';

const enumerations = require("../enumerations/blockchain");

module.exports = function validateBlockchain(chain) {
    const blockchainsEnum = enumerations.blockchains;
    const validBlockchain = blockchainsEnum.hasOwnProperty(chain.toUpperCase());

    if (validBlockchain === false) {
        let blockchainsList = Object.keys(blockchainsEnum).map(function (k) {
            return blockchainsEnum[k]
        }).join(",");

        throw 'error: provided blockchain is not valid, please provide one of the following values: ' + blockchainsList;
    }

    return true;
}