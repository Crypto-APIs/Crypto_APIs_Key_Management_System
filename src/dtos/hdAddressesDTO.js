'use strict';

const baseDTO = require('./baseDTO');

class HdAddressesDTO extends baseDTO {

    /**
     * @param {object} object
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
        return this.data.data.item.addresses;
    }
}

module.exports = HdAddressesDTO;