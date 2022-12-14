'use strict';

const WalletServiceDTO = require("./walletDTO")
    , HDWalletDTO = require("./hdWalletDTO")
    , SubscriptionForUnconfirmedCoinsTxsDTO = require("./subscriptionForUnconfirmedCoinsTxsDTO")
    , SubscriptionForUnconfirmedTokensTxsDTO = require("./subscriptionForUnconfirmedTokensTxsDTO")
    , SubscriptionForUnconfirmedInternalTxsDTO = require("./subscriptionForUnconfirmedInternalTxsDTO")
    , BroadcastSignedTxDTO = require("./broadcastSignedTxDTO")
    , HDAddressesDTO = require("./hdAddressesDTO")
    , ErrorDTO = require("./errorDTO")
    , ListSyncedAddressesDTO = require("./listSyncedAddressesDTO")
    , AccountBasedTransactionDTO = require("./prepare/accountBasedTransactionDTO")
    , UTXOBasedTransactionDTO = require("./prepare/UTXOBasedTransaction")
    , SignDTO = require("./signDTO")
    , AddressDTO = require("./addressDTO")
;

module.exports = {
    WalletServiceDTO,
    HDWalletDTO,
    SubscriptionForUnconfirmedCoinsTxsDTO,
    SubscriptionForUnconfirmedTokensTxsDTO,
    SubscriptionForUnconfirmedInternalTxsDTO,
    BroadcastSignedTxDTO,
    HDAddressesDTO,
    ErrorDTO,
    ListSyncedAddressesDTO,
    AccountBasedTransactionDTO,
    UTXOBasedTransactionDTO,
    SignDTO,
    AddressDTO
};