'use strict';

const walletServiceDTO = require("./walletServiceDTO")
    , hdWalletDTO = require("./hdWalletDTO")
    , subscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , subscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , subscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , broadcastedTransactionCallbackDTO = require("./broadcastedTransactionCallbackDTO")
    , broadcastSignedTxDTO = require("./broadcastSignedTxDTO")
    , hdAddressesDTO = require("./hdAddressesDTO")
    , errorDTO = require("./errorDTO")

module.exports = {
    walletServiceDTO: walletServiceDTO,
    hdWalletDTO: hdWalletDTO,
    subscriptionForUnconfirmedCoinsTxsDTO: subscriptionForUnconfirmedCoinsTxsDTO,
    subscriptionForUnconfirmedTokensTxsDTO: subscriptionForUnconfirmedTokensTxsDTO,
    subscriptionForUnconfirmedInternalTxsDTO: subscriptionForUnconfirmedInternalTxsDTO,
    broadcastedTransactionCallbackDTO: broadcastedTransactionCallbackDTO,
    broadcastSignedTxDTO: broadcastSignedTxDTO,
    hdAddressesDTO: hdAddressesDTO,
    errorDTO: errorDTO,
}