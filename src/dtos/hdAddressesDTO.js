'use strict';

const BaseDTO = require('./baseDTO');

class HdAddressesDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {HdAddressesDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }

    /**
     * @returns {Array}
     */
    get addresses() {
        return this.item.addresses;
    }
}

module.exports = HdAddressesDTO;