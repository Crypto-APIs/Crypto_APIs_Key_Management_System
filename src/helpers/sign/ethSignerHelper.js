'use strict';

const BaseSignerHelper = require('./baseSignerHelper')
    , {FeeMarketEIP1559Transaction: GasFeeMarketTransaction, Transaction} = require('@ethereumjs/tx')
    , AccountBasedTransaction = require('../prepare/accountBasedPrepareHelper')
    , HDKey = require("hdkey")
    , LEGACY_TRANSACTION = 'legacy-transaction'
;

/**
 * EthSignerHelper
 *
 * @class EthSignerHelper
 *
 * @extends {BaseSignerHelper}
 */
class EthSignerHelper extends BaseSignerHelper {
    /**
     * @inheritDoc
     */
    sign({xPriv, transaction}) {
        const privKey = this._preparePrivKey(xPriv, transaction?.derivationIndex);
        const tx = this._buildTransaction(transaction);
        const signedTX = tx.sign(privKey);
        const serializedTx = signedTX.serialize();

        return {
            id: '0x' + signedTX.hash().toString('hex'),
            raw: '0x' + serializedTx.toString('hex'),
        };
    };

    /**
     * @param {string} xPriv
     * @param {string} index
     *
     * @returns Buffer
     */
    _preparePrivKey(xPriv, index) {
        if (index) {
            const hdkey = HDKey.fromExtendedKey(xPriv)
            const derivationPath = `m/0/${index}`;
            const derivedPrivKey = hdkey.derive(derivationPath);

            return derivedPrivKey.privateKey;
        }
        if (xPriv.startsWith("0x")) {
            xPriv = xPriv.slice(2);
        }
        return Buffer.from(xPriv, 'hex');
    }

    /**
     *
     * @param {AccountBasedTransaction} transaction
     *
     * @return {{}}
     */
    _buildTransaction(transaction) {
        let txData = {
            from: transaction?.sender,
            to: transaction?.recipient,
            value: transaction?.amount,
            maxFeePerGas: transaction?.maxFeePerGas,
            maxPriorityFeePerGas: transaction?.maxPriorityFeePerGas,
            gasLimit: transaction?.gasLimit,
            gasPrice: transaction?.gasPrice,
            nonce: transaction?.nonce,
            data: transaction?.data?.data || transaction?.data,
            type: "0x2"
        };

        if (transaction?.transactionType === LEGACY_TRANSACTION) {
            return  Transaction.fromTxData(txData, this.networkConfig)
        }

        return GasFeeMarketTransaction.fromTxData(txData, this.networkConfig);
    }
}

module.exports = EthSignerHelper;