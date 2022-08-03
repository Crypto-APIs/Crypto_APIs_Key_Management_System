'use strict';

class RecipientModel {
    /**
     * @param {string} address
     * @param {string} amount
     */
    constructor(address, amount) {
        this._address = address;
        this._amount = amount;

        if (!this._address || !this._amount) {
            throw new Error('Invalid data provided!')
        }
    }

    /**
     * @return {string}
     */
    getAddress() {
        return this._address;
    }

    /**
     * @return {string}
     */
    getAmount() {
        return this._amount;
    }
}

module.exports = RecipientModel;