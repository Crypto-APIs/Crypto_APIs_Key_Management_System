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
     * @param {string} xPriv extended account xpriv
     * @param {TransactionDTO} transaction
     * @return {SignDTO}
     */
    signPreparedTransaction(xPriv, transaction) {
        const signer = SignerHelperFactory.create({
            blockchain: this.blockchain,
            network: this.network
        });

        return signer.sign({xPriv: xPriv, transaction: transaction});
    }
}

module.exports = SignService;