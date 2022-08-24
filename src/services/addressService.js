'use strict';

const { BaseBlockchainAwareService } = require("./baseServices")
    , GeneratorHelperFactory = require("../helpers/generateAddress/generatorHelperFactory")
;

/**
 * AddressService
 *
 * @class AddressService
 *
 * @extends {BaseBlockchainAwareService}
 */
class AddressService extends BaseBlockchainAwareService {

    /**
     * @returns {AddressDTO}
     */
    generateAddress() {
        const generator = GeneratorHelperFactory.create({
            blockchain: this.blockchain,
            network: this.network
        })

        return generator.generateAddress();
    }
}

module.exports = AddressService;
