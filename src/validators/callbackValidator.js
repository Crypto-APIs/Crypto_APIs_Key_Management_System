'use strict';

const errors = require('./customErrors')

module.exports = {

    /**
     * @param {object} response
     * @returns {boolean}
     */
    init: function (response) {

        if (typeof response !== "object") {
            throw errors.getErrorMessage('INVALID_CALLBACK');
        }

        return true;
    },
}