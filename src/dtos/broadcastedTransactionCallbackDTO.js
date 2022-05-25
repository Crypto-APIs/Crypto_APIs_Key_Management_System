'use strict';

const baseDTO = require('./baseDTO');

class BroadcastedTransactionCallbackDTO extends baseDTO {

    /**
     * @param {Object} object
     * @returns {BroadcastedTransactionCallbackDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = BroadcastedTransactionCallbackDTO