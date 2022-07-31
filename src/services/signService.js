'use strict';

const SignerHelperFactory = require("../helpers/sign/signerHelperFactory");
const HDKey = require("hdkey");

/**
 * SignService
 *
 * @class SignService
 *
 */
class SignService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} xpriv
     * @param {Transaction} transaction
     * @return {{id: string, raw: string}}
     */
    signPreparedTransaction(xpriv, transaction) {
        const signerFactory = new SignerHelperFactory({blockchain: this.blockchain, network: this.network})
        const signer = signerFactory.create();
        const hdKey = HDKey.fromExtendedKey(xpriv)
        const change = transaction?.change ? transaction.change : 0;
        const derivationPath = `m/${change}/${transaction.derivationIndex}`;
        const derivedPrivKey = hdKey.derive(derivationPath)

        return signer.sign({key: derivedPrivKey.privateKey, transaction: transaction, options: {}})
    }
}

module.exports = SignService;