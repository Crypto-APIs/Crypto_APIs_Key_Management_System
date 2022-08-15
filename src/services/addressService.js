'use strict';

const { BaseBlockchainAwareService } = require("./baseServices")
    , GeneratorHelperFactory = require("../helpers/generateAddress/generatorHelperFactory")
    , AddressDTO = require("../dtos/addressDTO")
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
     *
     * @returns {AddressDTO}
     */
    async generateAddress() {
        const generator = GeneratorHelperFactory.create({
            blockchain: this.blockchain,
            network: this.network
        })

        return generator.deriveXpubAddress();
    }
}

module.exports = AddressService;
