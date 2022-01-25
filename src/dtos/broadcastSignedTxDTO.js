'use strict';

const baseDTO = require('./baseDTO');

class BroadcastSignedTxDTO extends baseDTO {

    /**
     * @param {object} object
     * @returns {BroadcastSignedTxDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = BroadcastSignedTxDTO