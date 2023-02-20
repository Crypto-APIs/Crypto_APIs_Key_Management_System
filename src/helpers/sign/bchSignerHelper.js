'use strict';

const BaseSignerHelper = require('./baseSignerHelper')
    , bitcoreLibCash = require('bitcore-lib-cash')
    , HDKey = require("hdkey")
    , bitcoinjs = require("bitcoinjs-lib")
;

/**
 * BchSignerHelper
 *
 * @class BchSignerHelper
 *
 * @extends {BaseSignerHelper}
 */
class BchSignerHelper extends BaseSignerHelper {
    /**
     * @inheritDoc
     */
    sign({xPriv, transaction}) {
        const prepared = new bitcoreLibCash.Transaction({})
            .from(transaction.data.inputs)
        ;

        prepared.version = transaction?.version || 2;

        for (const output of transaction.outputs) {
            prepared.addOutput(new bitcoreLibCash.Transaction.Output({
                satoshis: output.satoshis,
                script: output.script,
            }));
        }

        if (transaction.feePerByte) {
            prepared.feePerByte(transaction.feePerByte);
        }

        if (transaction.transactionData) {
            prepared.addData(transaction.transactionData);
        }

        if (transaction.locktime) {
            if (transaction.locktime >= 500000000) {
                prepared.lockUntilDate(transaction.locktime);
            } else {
                prepared.lockUntilBlockHeight(transaction.locktime);
            }
        }

        const hdKey = this._createHDKey(xPriv);
        const privKeys = transaction.inputs.map( (input) => {
            const derivationPath = `m/${input.change}/${input.derivationIndex}`;
            const derivedPrivKey = hdKey.derive(derivationPath)
            const signer = bitcoinjs.ECPair.fromPrivateKey(
                Buffer.from(derivedPrivKey.privateKey, 'hex'),
                {network: this.networkConfig}
            );
            return new bitcoreLibCash.PrivateKey(signer.privateKey.toString('hex'));
        })

        prepared.sign(privKeys);
        prepared.isFullySigned();

        return {
            id: prepared.id,
            raw: prepared.serialize({
                disableDustOutputs: true,
                disableMoreOutputThanInput: true,
                disableLargeFees: true,
            }),
        };
    }
}

module.exports = BchSignerHelper;