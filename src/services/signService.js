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
     * @param {string} key
     * @param {Transaction} transaction
     * @return {{id: string, raw: string}}
     */
    signPreparedTransaction(key, transaction) {
        const signerFactory = new SignerHelperFactory({blockchain: this.blockchain, network: this.network})
        const signer = signerFactory.create();

        return signer.sign({key: key, transaction: transaction, options: {}})
    }
}

module.exports = SignService;