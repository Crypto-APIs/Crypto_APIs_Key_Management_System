'use strict'

const TransactionDTO = require('./transactionDTO');
const Decimal = require('decimal.js');

class UTXOBasedTransactionDTO extends TransactionDTO {
    /**
     * @param {Object} object
     * @returns {UTXOBasedTransactionDTO}
     */
    constructor(object) {
        super(object.data.item);
    }

    /**
     * @param {Object} data
     * @return {{transaction: {}, input_signatures: string[]}}
     * @protected
     */
    _prepareData(data) {
        const requiredAttributes = ['vin','vout'];

        for (const attr of requiredAttributes) {
            if (!data?.blockchainSpecific.hasOwnProperty(attr)) {
                throw new Error(attr + ' is not provided');
            }
        }

        if (!Array.isArray(data?.blockchainSpecific['vin']) || data?.blockchainSpecific['vout'].length === 0) {
            throw new Error('inputs are empty or not an array');
        }

        if (!Array.isArray(data?.blockchainSpecific['vout']) || data?.blockchainSpecific['vout'].length === 0) {
            throw new Error('outputs are empty or not an array');
        }

        const requiredInputAttributes = ['transactionId', 'outputIndex', 'address', 'script', 'change', 'satoshis', 'derivationIndex'];
        for (const input of data?.blockchainSpecific['vin']) {
            for (const attr of requiredInputAttributes) {
                if (!input.hasOwnProperty(attr)) {
                    throw new Error('Input ' + attr + ' is not provided');
                }
            }
        }

        const requiredOutputAttributes = ['script','address'];
        for (const output of data?.blockchainSpecific['vout']) {
            for (const attr of requiredOutputAttributes) {
                if (!output.hasOwnProperty(attr)) {
                    throw new Error('Input ' + attr + ' is not provided');
                }
            }
        }

        return {
            inputs: data.blockchainSpecific.vin.map((input) => {
                return {
                    address: input.address,
                    txid: input.transactionId,
                    satoshis: input.satoshis,
                    script: input.script,
                    outputIndex: input.outputIndex,
                    derivationIndex: input.derivationIndex,
                    change: input.change
                }
            }),
            outputs: data.blockchainSpecific.vout,
            locktime: data?.locktime ? data.locktime : null,
            replaceable: data?.blockchainSpecific?.replaceable ? data.blockchainSpecific.replaceable : false,
            data: data?.data ? data.data : null,
            feePerByte: data?.feePerByte ? new Decimal(data.feePerByte).toDecimalPlaces(8).toFixed() : null,
            fee: data?.fee ? data.fee : 0,
            version: data?.version ? data.version : null,
        };
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

    /**
     *
     * @return {number}
     */
    get version() {
        return this.data['version'];
    }
}

module.exports = UTXOBasedTransactionDTO;
