'use strict';

const feePriorityEnum = require('../enumerations/feePriorityEnum')
    , prepareStrategyEnum = require('../enumerations/prepareStrategyEnum')
;

class FeeOptionsBaseModel {

    /**
     * @param {feePriorityEnum} priority
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
     * @return {feePriorityEnum}
     */
    getPriority() {
        return this._priority;
    }
}

class AccountBasedFeeOptionsModel extends FeeOptionsBaseModel {}

class UTXOBasedFeeOptionsModel extends FeeOptionsBaseModel {
    /**
     * @param {feePriorityEnum} priority
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
    AccountBasedFeeOptionsModel: AccountBasedFeeOptionsModel,
    UTXOBasedFeeOptionsModel: UTXOBasedFeeOptionsModel
};