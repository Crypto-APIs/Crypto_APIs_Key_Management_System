'use strict';

const BaseSignerHelper = require('./baseSignerHelper')
    , {FeeMarketEIP1559Transaction: GasFeeMarketTransaction} = require('@ethereumjs/tx')
    , AccountBasedTransaction = require('../prepare/accountBasedPrepareHelper')
    , HDKey = require("hdkey")
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
        const hdkey = HDKey.fromExtendedKey(xPriv)
        const derivationPath = `m/0/${transaction.derivationIndex}`;
        const derivedPrivKey = hdkey.derive(derivationPath);
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
            data: transaction?.data?.data,
            type: "0x2"
        };

        return GasFeeMarketTransaction.fromTxData(txData, this.networkConfig);
    }
}

module.exports = EthSignerHelper;