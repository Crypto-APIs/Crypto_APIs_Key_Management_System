'use strict';

const BaseSigner = require('./baseSignerHelper')
    , bitcoinjs = require('bitcoinjs-lib')
    , bitcorejs = require('bitcore-lib')
;

/**
 * BtcSigner
 *
 * @class BtcSigner
 * @extends {BaseSigner}
 */
class BtcSigner extends BaseSigner {
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
        const signer = bitcoinjs.ECPair.fromPrivateKey(
            Buffer.from(key, 'hex'),
            {network: this.networkConfig}
        );

        const privateKey = new bitcorejs.PrivateKey(signer.privateKey.toString('hex'));
        const prepared = new bitcorejs.Transaction()
            .from(transaction.inputs)
        ;

        for (const output of transaction.outputs) {
            prepared.addOutput(new bitcorejs.Transaction.Output({
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

        if (transaction.replaceable) {
            prepared.enableRBF();
        }

        prepared.sign(privateKey);
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
    };
}

module.exports = BtcSigner;