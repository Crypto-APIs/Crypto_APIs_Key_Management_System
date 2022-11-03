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
        const requiredAttributes = ['sender', 'recipient', 'nonce', 'amount', 'fee', 'derivationIndex'];
        for (const attr of requiredAttributes) {
            if (!data.hasOwnProperty(attr) && !data?.blockchainSpecific.hasOwnProperty(attr)) {
                throw new Error(attr + ' is not provided');
            }
        }

        return {
            sender: data.sender,
            transactionType: data.transactionType,
            recipient: data.recipient,
            amount: hex2dec.decToHex(data.amount),
            nonce: hex2dec.decToHex(data?.blockchainSpecific.nonce),
            data: data?.blockchainSpecific.dataHex,
            derivationIndex: data?.blockchainSpecific?.derivationIndex,
            gasPrice: hex2dec.decToHex(data?.blockchainSpecific?.fee?.gasPrice),
            gasLimit: hex2dec.decToHex(data?.blockchainSpecific?.fee?.gasLimit),
            maxFeePerGas: data?.blockchainSpecific?.fee?.maxFeePerGas ? hex2dec.decToHex(data.blockchainSpecific.fee.maxFeePerGas) : null,
            maxPriorityFeePerGas: data?.blockchainSpecific?.fee?.maxPriorityFeePerGas ? hex2dec.decToHex(data.blockchainSpecific.fee.maxPriorityFeePerGas) : null,
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