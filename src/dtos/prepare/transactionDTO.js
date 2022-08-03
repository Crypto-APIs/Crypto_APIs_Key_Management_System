'use strict'

class TransactionDTO {
    /**
     * @param {Object} object
     * @throws Error
     */
    constructor(object) {
        this.data = this._prepareData(object);
    }

    /**
     * @param {Object} data
     * @return {Object}
     * @throws Error
     * @protected
     */
    _prepareData(data) {
        throw new Error('Implement _prepareData method for service ' + this.constructor.name);
    }

    /**
     * @return {Object}
     */
    getData() {
        return this.data;
    }
}

module.exports = TransactionDTO;