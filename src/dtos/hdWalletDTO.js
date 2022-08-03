'use strict';

const BaseDTO = require('./baseDTO');

class HDWalletDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {HDWalletDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = HDWalletDTO;