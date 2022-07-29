'use strict'

const BaseDTO = require("../baseDTO")

class AccountBasedTransactionDTO extends BaseDTO {
    /**
     * @param {Object} object
     * @returns {AccountBasedTransactionDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }

    /**
     * @return {string}
     */
    get nonce() {
        return this.item.nonce;
    }

    /**
     * @return {string}
     */
    get gasPrice() {
        return this.fee.gasPrice;
    }

    /**
     * @return {string}
     */
    get gasLimit() {
        return this.fee.gasLimit;
    }

    /**
     * @return {string}
     */
    get maxFeePerGas() {
        return this.fee.maxFeePerGas;
    }

    /**
     * @return {string}
     */
    get maxPriorityFeePerGas() {
        return this.fee.maxPriorityFeePerGas;
    }

    /**
     * @return {string}
     */
    get amount() {
        return this.item.amount;
    }

    /**
     * @return {string}
     */
    get sender() {
        return this.item.sender;
    }

    /**
     * @return {string}
     */
    get recipient() {
        return this.item.recipient;
    }

    /**
     * @return {string}
     */
    get dataHex() {
        return this.item.dataHex;
    }

    /**
     * @return {string}
     */
    get derivationIndex() {
        return this.item.derivationIndex;
    }

    /**
     * @return {string}
     */
    get transactionType() {
        return this.item.transactionType;
    }

    /**
     * @return {string}
     */
    get sigHash() {
        return this.item.sigHash;
    }

    /**
     * @return {Object}
     */
    get fee() {
        return this.item.fee
    }

}

module.exports = AccountBasedTransactionDTO;