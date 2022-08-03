'use strict';

const errors = require('../validators/customErrors');

class ErrorDTO {
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

module.exports = ErrorDTO;