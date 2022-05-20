'use strict';

const baseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedInternalTxsDTO extends baseDTO {

    /**
     * @param {Object} object
     * @returns {SubscriptionForUnconfirmedInternalTxsDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = SubscriptionForUnconfirmedInternalTxsDTO