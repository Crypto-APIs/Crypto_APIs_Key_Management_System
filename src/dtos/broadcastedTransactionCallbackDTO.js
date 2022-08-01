'use strict';

const BaseDTO = require('./baseDTO');

class BroadcastedTransactionCallbackDTO extends BaseDTO {

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