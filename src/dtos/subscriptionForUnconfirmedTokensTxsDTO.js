'use strict';

const baseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedTokensTxsDTO extends baseDTO {

    /**
     * @param {object} object
     * @returns {SubscriptionForUnconfirmedTokensTxsDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = SubscriptionForUnconfirmedTokensTxsDTO