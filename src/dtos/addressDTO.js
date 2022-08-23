'use strict';


class AddressDTO {

    /**
     * @param {Object} object
     *
     * @returns {AddressDTO}
     */
    constructor(object) {
        this._data = object;

        return this;
    }

    /**
     * @returns {string}
     */
    get address() {
        return this._data.address;
    }

    /**
     * @returns {string}
     */
    get privateKey() {
        return this._data.privateKey;
    }

    /**
     * @returns {string}
     */
    get publicKey() {
        return this._data.publicKey;
    }
}

module.exports = AddressDTO;