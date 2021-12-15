'use strict';

const hdWalletDTO = require("./hdWalletDTO")
    , subscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , subscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , subscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")

module.exports = {
    hdWalletDTO: hdWalletDTO,
    subscriptionForUnconfirmedCoinsTxsDTO: subscriptionForUnconfirmedCoinsTxsDTO,
    subscriptionForUnconfirmedTokensTxsDTO: subscriptionForUnconfirmedTokensTxsDTO,
    subscriptionForUnconfirmedInternalTxsDTO: subscriptionForUnconfirmedInternalTxsDTO,
}