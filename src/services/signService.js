'use strict';

const SignerHelperFactory = require("../helpers/sign/signerHelperFactory");

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
     * Sign Prepared Transaction Locally
     * Through this endpoint users can sign their transactions locally(offline) using the transaction response from Prepare Transaction From XPUB endpoint, both for account-based and UTXO-based
     * @param {string} xpriv extended account xpriv
     * @param {Transaction} transaction
     * @return {{id: string, raw: string}}
     */
    signPreparedTransaction(xpriv, transaction) {
        const signerFactory = new SignerHelperFactory({blockchain: this.blockchain, network: this.network})
        const signer = signerFactory.create();

        return signer.sign({key: xpriv, transaction: transaction, options: {}})
    }
}

module.exports = SignService;