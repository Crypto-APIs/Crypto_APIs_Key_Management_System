'use strict';

const walletServiceDTO = require("./walletServiceDTO")
    , hdWalletDTO = require("./hdWalletDTO")
    , subscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , subscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , subscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , broadcastedTransactionCallbackDTO = require("./broadcastedTransactionCallbackDTO")

module.exports = {
    walletServiceDTO: walletServiceDTO,
    hdWalletDTO: hdWalletDTO,
    subscriptionForUnconfirmedCoinsTxsDTO: subscriptionForUnconfirmedCoinsTxsDTO,
    subscriptionForUnconfirmedTokensTxsDTO: subscriptionForUnconfirmedTokensTxsDTO,
    subscriptionForUnconfirmedInternalTxsDTO: subscriptionForUnconfirmedInternalTxsDTO,
    broadcastedTransactionCallbackDTO: broadcastedTransactionCallbackDTO,
}