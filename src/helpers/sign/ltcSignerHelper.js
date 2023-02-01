'use strict';

const BaseSignerHelper = require('./baseSignerHelper')
    , bitcoinjs = require("bitcoinjs-lib")
    , bitcorejs = require("bitcore-lib-ltc")
    , HDKey = require("hdkey")
;

/**
 * LtcSignerHelper
 *
 * @class LtcSignerHelper
 *
 * @extends {BaseSignerHelper}
 */
class LtcSignerHelper extends BaseSignerHelper {
    /**
     * @inheritDoc
     */
    sign({xPriv, transaction}) {
        const prepared = new bitcorejs.Transaction({})
            .from(transaction.data.inputs)
        ;

        prepared.version = transaction?.version || 2;

        for (const output of transaction.outputs) {
            prepared.addOutput(new bitcorejs.Transaction.Output({
                satoshis: output.satoshis,
                script: output.script,
            }));
        }

        if (transaction.feePerByte) {
            prepared.feePerKb(Math.round(transaction.feePerByte / 1024));
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

        if (transaction.replaceable) {
            prepared.enableRBF();
        }

        const hdKey = HDKey.fromExtendedKey(xPriv, this.networkConfig.bip32)
        let privKeys = transaction.inputs.map((input) => {
            const derivationPath = `m/${input.change}/${input.derivationIndex}`;
            const derivedPrivKey = hdKey.derive(derivationPath)
            const signer = bitcoinjs.ECPair.fromPrivateKey(
                Buffer.from(derivedPrivKey.privateKey, 'hex'),
                {network: this.networkConfig}
            );
            return new bitcorejs.PrivateKey(signer.privateKey.toString('hex'));
        })

        prepared.sign(privKeys);
        prepared.isFullySigned();

        return {
            id: prepared.id,
            raw: prepared.serialize({
                disableDustOutputs: true,
                disableMoreOutputThanInput: true,
                disableLargeFees: true,
                disableSmallFees: true,
            }),
        };
    }
}

module.exports = LtcSignerHelper;