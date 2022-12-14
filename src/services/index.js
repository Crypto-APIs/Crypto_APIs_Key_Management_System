'use strict';

const HDWalletService = require('./hdWalletsService')
    , WalletService = require('./walletService')
    , BroadcastService = require('./broadcastService')
    , SubscriptionsService = require('./subscriptionsService')
    , PrepareService = require('./prepareService')
    , SignService = require('./signService')
    , AddressService = require('./addressService')
;

module.exports = {
    HDWalletService,
    WalletService,
    BroadcastService,
    SubscriptionsService,
    PrepareService,
    SignService,
    AddressService
};