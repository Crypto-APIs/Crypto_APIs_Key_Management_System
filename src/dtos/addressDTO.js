'use strict';


class AddressesDTO {

    /**
     * @param {Object} object
     *
     * @returns {AddressesDTO}
     */
    constructor(object) {
        this.data = object;

        return this;
    }

    /**
     * @returns {Array}
     */
    get address() {
        return this.data.address;
    }

    /**
     * @returns {Array}
     */
    get privateKey() {
        return this.data.privateKey;
    }

    /**
     * @returns {Array}
     */
    get publicKey() {
        return this.data.publicKey;
    }
}

module.exports = AddressesDTO;