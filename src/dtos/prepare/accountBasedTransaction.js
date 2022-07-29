'use strict'

const Transaction = require('./transaction');
const hex2dec = require('hex2dec');

class AccountBasedTransaction extends Transaction {
    /**
     * @param {Object} data
     * @return {{gasLimit: string, to: string, nonce: string, value: string, gasPrice: string}}
     * @private
     */
    _prepareData(data) {
        let prepared = {};

        const requiredAttributes = ['fromAddress', 'toAddress', 'nonce', 'gasPrice', 'gasLimit', 'amount'];

        for (const attr of requiredAttributes) {
            if (!data.hasOwnProperty(attr)) {
                throw new Error(attr + ' is not provided');
            }
        }

        prepared = {
            nonce: hex2dec.decToHex(data['nonce'].toString()),
            gasPrice: hex2dec.decToHex(data['gasPrice'].toString()),
            gasLimit: hex2dec.decToHex(data['gasLimit'].toString()),
            amount: hex2dec.decToHex(data['amount'].toString()),
            fromAddress: (data['fromAddress'].startsWith('0x') ? '' : '0x') + data['fromAddress'],
            toAddress: (data['toAddress'].startsWith('0x') ? '' : '0x') + data['toAddress'],
        };

        if (data.hasOwnProperty('dataHex') && data['dataHex']) {
            prepared['data'] = (data['dataHex'].startsWith('0x') ? '' : '0x') + data['dataHex'];
        }

        return prepared;
    }

    /**
     * @return {string}
     */
    get nonce() {
        return this.data['nonce'];
    }

    /**
     * @return {string}
     */
    get gasPrice() {
        return this.data['gasPrice'];
    }

    /**
     * @return {string}
     */
    get gasLimit() {
        return this.data['gasLimit'];
    }

    /**
     * @return {string}
     */
    get amount() {
        return this.data['amount'];
    }

    /**
     * @return {string}
     */
    get fromAddress() {
        return this.data['fromAddress'];
    }

    /**
     * @return {string}
     */
    get toAddress() {
        return this.data['toAddress'];
    }

    /**
     * @return {string|null}
     */
    get transactionData() {
        return this.data.hasOwnProperty('data') ? this.data['data'] : null;
    }
}

module.exports = AccountBasedTransaction;