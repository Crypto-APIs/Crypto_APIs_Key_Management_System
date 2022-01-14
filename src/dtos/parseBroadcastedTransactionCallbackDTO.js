'use strict';

const baseDTO = require('./baseDTO');

class ParseBroadcastedTransactionCallbackDTO extends baseDTO {

    /**
     * @param {object} object
     * @returns {ParseBroadcastedTransactionCallbackDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = ParseBroadcastedTransactionCallbackDTO