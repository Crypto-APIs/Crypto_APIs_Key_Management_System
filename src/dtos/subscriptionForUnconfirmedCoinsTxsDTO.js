'use strict';

const baseDTO = require('./baseDTO');

class SubscriptionForUnconfirmedCoinsTxsDTO extends baseDTO {

    /**
     * @param {object} object
     * @returns {SubscriptionForUnconfirmedCoinsTxsDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }
}

module.exports = SubscriptionForUnconfirmedCoinsTxsDTO