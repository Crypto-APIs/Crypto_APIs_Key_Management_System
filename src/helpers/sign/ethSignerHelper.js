'use strict';

const BaseSigner = require('./baseSignerHelper')
    , {FeeMarketEIP1559Transaction: GasFeeMarketTransaction} = require('@ethereumjs/tx')
    , HDKey = require('hdkey')
    , hex2dec = require('hex2dec');
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
        console.log('\n DERIVE', derivationPath, transaction.data.item, derivedPrivKey.privateKey.toString('hex'))
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
            // from: transaction.sender,
            to: transaction.recipient,
            value: hex2dec.decToHex(transaction.amount),
            // gasPrice: hex2dec.decToHex(transaction.gasPrice),
            maxFeePerGas: hex2dec.decToHex(transaction.maxFeePerGas),
            maxPriorityFeePerGas: hex2dec.decToHex(transaction.maxPriorityFeePerGas),
            gasLimit: hex2dec.decToHex(transaction.gasLimit),
            nonce: hex2dec.decToHex(transaction.nonce),
            data: transaction.dataHex,
            accessList: [],
            type: hex2dec.decToHex('2')
        };

        return GasFeeMarketTransaction.fromTxData(txData, this.networkConfig);
    }
}

module.exports = EthSigner;