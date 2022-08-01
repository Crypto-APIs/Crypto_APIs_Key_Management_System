'use strict';

const WalletServiceDTO = require("./walletDTO")
    , HDWalletDTO = require("./hdWalletDTO")
    , SubscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , SubscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , SubscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , BroadcastedTransactionCallbackDTO = require("./broadcastedTransactionCallbackDTO")
    , BroadcastSignedTxDTO = require("./broadcastSignedTxDTO")
    , HDAddressesDTO = require("./hdAddressesDTO")
    , ErrorDTO = require("./errorDTO")
    , ListSyncedAddressesDTO = require("./listSyncedAddressesDTO")
    , AccountBasedTransactionDTO = require("./prepare/accountBasedTransactionDTO")
    , UTXOBasedTransactionDTO = require("./prepare/UTXOBasedTransaction")
    , SignDTO = require("./signDTO")
;

module.exports = {
    WalletServiceDTO,
    HDWalletDTO,
    SubscriptionForUnconfirmedCoinsTxsDTO,
    SubscriptionForUnconfirmedTokensTxsDTO,
    SubscriptionForUnconfirmedInternalTxsDTO,
    BroadcastedTransactionCallbackDTO,
    BroadcastSignedTxDTO,
    HDAddressesDTO,
    ErrorDTO,
    ListSyncedAddressesDTO,
    AccountBasedTransactionDTO,
    UTXOBasedTransactionDTO,
    SignDTO
};