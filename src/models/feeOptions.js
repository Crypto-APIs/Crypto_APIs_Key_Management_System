'use strict';

const priorityEnum = require('../enumerations/feePriorities')
    , prepareStrategyEnum = require('../enumerations/prepareStrategies')
;

class FeeOptionsBase {

    /**
     * @param {priorityEnum} priority
     * @param {string} feeAmount
     */
    constructor({priority, feeAmount}) {
        this._priority = priority;
        this._feeAmount = feeAmount;

        if (!this._priority && !this._feeAmount) {
            throw new Error('Either priority or fee amount must be set!')
        }
    }

    /**
     * @return {string}
     */
    getFeeAmount() {
        return this._feeAmount;
    }

    /**
     * @return {priorityEnum}
     */
    getPriority() {
        return this._priority;
    }
}

class AccountBasedFeeOptions extends FeeOptionsBase {
    /**
     * @param {priorityEnum} priority
     * @param {string} feeAmount
     */
    constructor({priority, feeAmount}) {
        super({priority, feeAmount});
    }
}

class UTXOBasedFeeOptions extends FeeOptionsBase {
    /**
     * @param {priorityEnum} priority
     * @param {string} feeAmount
     * @param {prepareStrategyEnum} prepareStrategy
     * @param {string} feeAddress
     */
    constructor({priority, feeAmount, prepareStrategy, feeAddress}) {
        super({priority, feeAmount});

        this._prepareStrategy = prepareStrategy;
        this._feeAddress = feeAddress;
    }

    /**
     * @return {prepareStrategyEnum}
     */
    getPrepareStrategy() {
        return this._prepareStrategy;
    }

    /**
     * @return {string}
     */
    getFeeAddress() {
        return this._feeAddress;
    }
}

module.exports = {
    AccountBasedFeeOptions,
    UTXOBasedFeeOptions
};