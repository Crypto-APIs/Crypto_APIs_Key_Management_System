'use strict';

const BaseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedCoinsTxsDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {SubscriptionForUnconfirmedCoinsTxsDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = SubscriptionForUnconfirmedCoinsTxsDTO