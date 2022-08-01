'use strict';

const BaseDTO = require('./baseDTO');

class ListSyncedAddressesDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {ListSyncedAddressesDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }

    /**
     * @returns {Array}
     */
    get addresses() {
        return this.data.items;
    }
}

module.exports = ListSyncedAddressesDTO;