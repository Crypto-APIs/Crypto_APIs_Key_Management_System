'use strict'

const Transaction = require('./transaction');
const Decimal = require('decimal.js');

class BitcoinBasedTransaction extends Transaction {
    /**
     * @param {Object} data
     * @return {{transaction: {}, input_signatures: string[]}}
     * @private
     */
    _prepareData(data) {
        let prepared = {};

        const requiredAttributes = ['inputs','outputs'];

        for (const attr of requiredAttributes) {
            if (!data.hasOwnProperty(attr)) {
                throw new Error(attr + ' is not provided');
            }
        }

        if (!Array.isArray(data['inputs']) || data['inputs'].length === 0) {
            throw new Error('inputs are empty or not an array');
        }

        if (!Array.isArray(data['outputs']) || data['outputs'].length === 0) {
            throw new Error('outputs are empty or not an array');
        }

        const requiredInputAttributes = ['txId', 'outputIndex', 'address', 'script', 'satoshis'];
        for (const input of data['inputs']) {
            for (const attr of requiredInputAttributes) {
                if (!input.hasOwnProperty(attr)) {
                    throw new Error('Input ' + attr + ' is not provided');
                }
            }
        }

        const requiredOutputAttributes = ['script','address'];
        for (const output of data['outputs']) {
            for (const attr of requiredOutputAttributes) {
                if (!output.hasOwnProperty(attr)) {
                    throw new Error('Input ' + attr + ' is not provided');
                }
            }
        }

        prepared = {
            inputs: data['inputs'],
            outputs: data['outputs'],
            locktime: data.hasOwnProperty('locktime') ? data['locktime'] : null,
            replaceable: data.hasOwnProperty('replaceable') ? data['replaceable'] : false,
            data: data.hasOwnProperty('data') ? data['data'] : null,
            feePerByte: data.hasOwnProperty('feePerByte') ? new Decimal(data['feePerByte']).toDecimalPlaces(8).toFixed() : null,
            fee: data.hasOwnProperty('fee') ? data['fee'] : 0,
        };

        return prepared;
    }

    /**
     * @return {Object[]}
     */
    get inputs() {
        return this.data['inputs'];
    }

    /**
     * @return {Object[]}
     */
    get outputs() {
        return this.data['outputs'];
    }

    /**
     * @return {number|null}
     */
    get locktime() {
        return this.data['locktime'];
    }

    /**
     * @return {boolean}
     */
    get replaceable() {
        return this.data['replaceable'];
    }

    /**
     * @return {string|null}
     */
    get transactionData() {
        return this.data['data'];
    }

    /**
     * @return {number|null}
     */
    get feePerByte() {
        return Math.round(this.data['feePerByte'] * 100000000);
    }

    /**
     * @return {number}
     */
    get fee() {
        return Math.round(this.data['fee'] * 100000000);
    }
}

module.exports = BitcoinBasedTransaction;
