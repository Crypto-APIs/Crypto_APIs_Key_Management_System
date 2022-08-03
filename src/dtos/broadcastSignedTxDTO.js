'use strict';

const BaseDTO = require('./baseDTO');

class BroadcastSignedTxDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {BroadcastSignedTxDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = BroadcastSignedTxDTO