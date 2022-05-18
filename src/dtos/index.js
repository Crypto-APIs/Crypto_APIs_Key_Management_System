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
};