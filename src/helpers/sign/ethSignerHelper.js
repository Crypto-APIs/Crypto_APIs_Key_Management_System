'use strict';

const BaseSigner = require('./baseSignerHelper')
    , {FeeMarketEIP1559Transaction: GasFeeMarketTransaction} = require('@ethereumjs/tx')
    , AccountBasedTransaction = require('../prepare/accountBasedPrepareHelper')
    , HDKey = require("hdkey")
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
        var hdkey = HDKey.fromExtendedKey(key)
        const derivationPath = `m/0/${transaction.derivationIndex}`;
        const derivedPrivKey = hdkey.derive(derivationPath)
        const tx = this._buildTransaction(transaction);
        const signedTX = tx.sign(derivedPrivKey.privateKey);
        const serializedTx = signedTX.serialize();

        return {
            id: '0x' + signedTX.hash().toString('hex'),
            raw: '0x' + serializedTx.toString('hex'),
        };
    };

    /**
     *
     * @param {AccountBasedTransaction} transaction
     */
    _buildTransaction(transaction) {
        let txData = {
            to: transaction.recipient,
            value: transaction.amount,
            maxFeePerGas: transaction.maxFeePerGas,
            maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
            gasLimit: transaction.gasLimit,
            nonce: transaction.nonce,
            data: transaction.dataHex,
            type: transaction.type
        };

        return GasFeeMarketTransaction.fromTxData(txData, this.networkConfig);
    }
}

module.exports = EthSigner;