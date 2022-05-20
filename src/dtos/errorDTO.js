'use strict';

const errors = require('../validators/customErrors');

class errorDTO {
    error;

    /**
     * @param {string} code
     * @param {Object|null} placeholder
     */
    constructor(code, placeholder = null) {
        this.error = errors.getErrorMessage(code, placeholder);

        return this;
    }
}

module.exports = errorDTO;