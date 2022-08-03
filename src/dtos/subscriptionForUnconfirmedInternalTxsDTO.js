'use strict';

const BaseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedInternalTxsDTO extends BaseDTO {

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