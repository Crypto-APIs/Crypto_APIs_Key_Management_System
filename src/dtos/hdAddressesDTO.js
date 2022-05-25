'use strict';

const baseDTO = require('./baseDTO');

class HdAddressesDTO extends baseDTO {

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