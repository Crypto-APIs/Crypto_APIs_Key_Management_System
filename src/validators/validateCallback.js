'use strict';

module.exports = {

    /**
     * @param {object} response
     * @returns {boolean}
     */
    init: function (response) {

        if (typeof response !== "object") {
            throw 'error: please provide valid callback object';
        }

        return true;
    },
}