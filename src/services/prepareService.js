'use strict';

const AccountBasedPrepareTransaction = require("../helpers/prepare/accountBasedPrepareHelper")
    , UTXOBasedPrepareTransaction = require("../helpers/prepare/UTXObasedPrepareHelper")
    , feePriorities = require('../enumerations/feePriorities')
;

/**
 * PrepareTransactionService
 *
 * @class PrepareTransactionService
 *
 */
class PrepareTransactionService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        this.cryptoApis = cryptoApis;
        this.blockchain = blockchain;
        this.network = network;
    }

    /**
     * @param {string} xpub
     * @param {string} sender
     * @param {string} recipient
     * @param {string} amount
     * @param {feePriorities|null} priority
     * @param {string|null} feeAmount
     * @param {string|null} nonce
     * @param {string|null} data
     */
    prepareAccountBasedTransactionFromXpub({
       xpub,
       sender,
       recipient,
       amount,
       priority,
       feeAmount,
       nonce,
       data
   }){
        const accountBasedService = new AccountBasedPrepareTransaction(
            this.cryptoApis,
            this.blockchain,
            this.network
        )

        return accountBasedService.prepare({
            xpub,
            sender,
            recipient,
            amount,
            priority,
            feeAmount,
            nonce,
            data
        })
    };

    prepareUTXOBasedTransactionFromXpub({
        xpub,
        prepareStrategy,
        recipients,
        locktime,
        replaceable,
        data,
        options
    }){
        const accountBasedService = new UTXOBasedPrepareTransaction(
            this.cryptoApis,
            this.blockchain,
            this.network
        )

        return accountBasedService.prepare({
            xpub,
            prepareStrategy,
            recipients,
            locktime,
            replaceable,
            data,
            options
        });
    }
}

module.exports = PrepareTransactionService;