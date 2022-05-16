'use strict';

const baseDTO = require('./baseDTO');

class hdWalletDTO extends baseDTO {

    /**
     * @param {object} object
     * @returns {hdWalletDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = hdWalletDTO;