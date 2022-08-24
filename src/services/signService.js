'use strict';

const SignerHelperFactory = require("../helpers/sign/signerHelperFactory")
    , {BaseBlockchainAwareService} = require("./baseServices")
    , {SignDTO} = require("../dtos")
;

/**
 * SignService
 *
 * @class SignService
 *
 * @extends {BaseBlockchainAwareService}
 */
class SignService extends BaseBlockchainAwareService {
    /**
     * Sign Prepared Transaction Locally
     * Through this endpoint users can sign their transactions locally(offline) using the transaction response from Prepare Transaction From XPUB endpoint, both for account-based and UTXO-based
     * @param {string} xPriv extended account xPriv
     * @param {TransactionDTO} transaction
     * @throws {Error}
     * @return {SignDTO}
     */
    signPreparedTransactionLocally(xPriv, transaction) {
        try {
            const signer = SignerHelperFactory.create({
                blockchain: this.blockchain,
                network: this.network
            });
            const signed = signer.sign({xPriv: xPriv, transaction: transaction});

            return new SignDTO(signed)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SignService;
