'use strict';

const walletServiceDTO = require("./walletDTO")
    , hdWalletDTO = require("./hdWalletDTO")
    , subscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , subscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , subscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , broadcastedTransactionCallbackDTO = require("./broadcastedTransactionCallbackDTO")
    , broadcastSignedTxDTO = require("./broadcastSignedTxDTO")
    , hdAddressesDTO = require("./hdAddressesDTO")
    , errorDTO = require("./errorDTO")
    , listSyncedAddressesDTO = require("./listSyncedAddressesDTO")
    , accountBasedTransactionDTO = require("./prepare/accountBasedTransactionDTO")
    , utxoBasedTransactionDTO = require("./prepare/UTXOBasedTransaction")
    , signDTO = require("./signDTO")
;

module.exports = {
    walletServiceDTO,
    hdWalletDTO,
    subscriptionForUnconfirmedCoinsTxsDTO,
    subscriptionForUnconfirmedTokensTxsDTO,
    subscriptionForUnconfirmedInternalTxsDTO,
    broadcastedTransactionCallbackDTO,
    broadcastSignedTxDTO,
    hdAddressesDTO,
    errorDTO,
    listSyncedAddressesDTO,
    accountBasedTransactionDTO,
    utxoBasedTransactionDTO,
    signDTO
};