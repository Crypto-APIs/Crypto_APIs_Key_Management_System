'use strict';

const walletServiceDTO = require("./walletServiceDTO")
    , hdWalletDTO = require("./hdWalletDTO")
    , subscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , subscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , subscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , parseBroadcastedTransactionCallbackDTO = require("./parseBroadcastedTransactionCallbackDTO")
    , errorDTO = require("./errorDTO")

module.exports = {
    walletServiceDTO: walletServiceDTO,
    hdWalletDTO: hdWalletDTO,
    subscriptionForUnconfirmedCoinsTxsDTO: subscriptionForUnconfirmedCoinsTxsDTO,
    subscriptionForUnconfirmedTokensTxsDTO: subscriptionForUnconfirmedTokensTxsDTO,
    subscriptionForUnconfirmedInternalTxsDTO: subscriptionForUnconfirmedInternalTxsDTO,
    parseBroadcastedTransactionCallbackDTO: parseBroadcastedTransactionCallbackDTO,
    errorDTO: errorDTO,
}