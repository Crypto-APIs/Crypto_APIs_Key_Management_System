'use strict';

const BaseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedTokensTxsDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {SubscriptionForUnconfirmedTokensTxsDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = SubscriptionForUnconfirmedTokensTxsDTO