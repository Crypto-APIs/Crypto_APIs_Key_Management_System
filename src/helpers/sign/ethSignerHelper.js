'use strict';

const BaseSigner = require('./baseSignerHelper')
    , EthereumTx = require('@ethereumjs/tx').Transaction
;

/**
 * EthSigner
 *
 * @class EthSigner
 * @extends {BaseSigner}
 */
class EthSigner extends BaseSigner {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        super({blockchain, network})
    }

    /**
     * @inheritDoc
     */
    sign({key, transaction, options = {}}) {
        const pk = Buffer.from(key, 'hex');
        const tx = this._buildTransaction(transaction);

        const signedTX = tx.sign(pk);
        const serializedTx = signedTX.serialize();

        return {
            id: '0x' + signedTX.hash().toString('hex'),
            raw: '0x' + serializedTx.toString('hex'),
        };
    };

    /**
     *
     * @param {EthereumBasedTransaction} transaction
     * @return {Transaction}
     */
    _buildTransaction(transaction) {
        let txData = {
            from: transaction.fromAddress,
            to: transaction.toAddress,
            value: transaction.amount,
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            nonce: transaction.nonce,
            data: transaction.transactionData,
        };

        txData = Object.assign(txData, {
            v: this.networkConfig.chainId * 2 + 35,
            r: 0,
            s: 0,
        });

        return new EthereumTx(txData, this.networkConfig);
    }
}

module.exports = EthSigner;