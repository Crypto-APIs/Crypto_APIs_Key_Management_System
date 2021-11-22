const enumerations = require("../enumerations/blockchain");

module.exports = function validateBlockchain(chain) {
    const blockchainsEnum = enumerations.blockchains;

    let validBlockchain = blockchainsEnum.hasOwnProperty(chain);

    if (validBlockchain === false) {
        let blockchainsList = Object.keys(blockchainsEnum).map(function (k) {
            return blockchainsEnum[k]
        }).join(",");
        return 'error: provided blockchain is not valid, please provide one of the following values: ' + blockchainsList;
    }

    return true;
}