'use strict'

const TransactionDTO = require("./transactionDTO")
const hex2dec = require("hex2dec");

class AccountBasedTransactionDTO extends TransactionDTO {
    /**
     * @param {Object} object
     * @returns {AccountBasedTransactionDTO}
     */
    constructor(object) {
        super(object.data.item);
    }

    /**
     * {Object} data
     * @return {{transactionType: string, gasLimit: (null|string|string), amount: (null|string|string), sender: *, nonce: (null|string|string), recipient: *}}
     * @protected
     */
    _prepareData(data) {
        const TRANSACTION_TYPE_GAS_FEE_MARKET = '2';

        const requiredAttributes = ['sender', 'recipient', 'nonce', 'amount', 'fee', 'derivationIndex'];
        for (const attr of requiredAttributes) {
            if (!data.hasOwnProperty(attr)) {
                throw new Error(attr + ' is not provided');
            }
        }

        return {
            transactionType: data.sender,
            recipient: data.recipient,
            amount: hex2dec.decToHex(data.amount),
            nonce: hex2dec.decToHex(data.nonce),
            type: hex2dec.decToHex(TRANSACTION_TYPE_GAS_FEE_MARKET),
            data: data.dataHex,
            derivationIndex: data.derivationIndex,
            gasPrice: hex2dec.decToHex(data.fee.gasPrice),
            gasLimit: hex2dec.decToHex(data.fee.gasLimit),
            maxFeePerGas: hex2dec.decToHex(data.fee.maxFeePerGas),
            maxPriorityFeePerGas: hex2dec.decToHex(data.fee.maxPriorityFeePerGas),
        };
    }


    /**
     * @return {string}
     */
    get nonce() {
        return this.data.nonce;
    }

    /**
     * @return {string}
     */
    get gasPrice() {
        return this.data.gasPrice;
    }

    /**
     * @return {string}
     */
    get gasLimit() {
        return this.data.gasLimit;
    }

    /**
     * @return {string}
     */
    get maxFeePerGas() {
        return this.data.maxFeePerGas;
    }

    /**
     * @return {string}
     */
    get maxPriorityFeePerGas() {
        return this.data.maxPriorityFeePerGas;
    }

    /**
     * @return {string}
     */
    get amount() {
        return this.data.amount;
    }

    /**
     * @return {string}
     */
    get sender() {
        return this.data.sender;
    }

    /**
     * @return {string}
     */
    get recipient() {
        return this.data.recipient;
    }

    /**
     * @return {string}
     */
    get dataHex() {
        return this.data.dataHex;
    }

    /**
     * @return {string}
     */
    get derivationIndex() {
        return this.data.derivationIndex;
    }

    /**
     * @return {string}
     */
    get transactionType() {
        return this.data.transactionType;
    }

    /**
     * @return {string}
     */
    get sigHash() {
        return this.data.sigHash;
    }

    /**
     * @return {Object}
     */
    get fee() {
        return this.data.fee
    }

}

module.exports = AccountBasedTransactionDTO;