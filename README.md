# Crypto APIs - Key Management System Tool (KMS)

- Package version: 0.1.0
- For more information, please visit [https://cryptoapis.io](https://cryptoapis.io)
- minimum requirement NodeJS >= 14.0

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

Then install it via:

```shell
npm install cryptoapis-kms-os-sdk
```

## create HDWallet

This method create HD Wallet for specific blockchain and network.

### Example

```javascript
const api = require('../src/');
const blockchain = api.blockchains.BITCOIN;
const network = api.networks[api.blockchains.BITCOIN].NETWORK_BITCOIN_MAINNET;
const client = new api.client('YOUR API KEY', blockchain, network);
 
client.createWallet().then((data) => {
    console.dir('API called successfully. Returned data:');
    console.dir(data);
}, (error) => {
    console.log(error)
});

```

### Return type

WalletServiceDTO

### Authorization

[ApiKey](#ApiKey)

## syncHDWallet
After initial sync we keep updating the synced HD wallets all the time.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);

 const data = client.syncHDWallet('xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB').then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
    console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**exPub** | **String**| Defines the account extended publicly known key which is used to derive all child public keys. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

hdWalletDTO

### Authorization

[ApiKey](#ApiKey)

## createSubscriptionForUnconfirmedCoinsTxs
Create callback subscriptions for a specific event. In this case the event called when there are new incoming or outgoing confirmed transactions for coins from/to the customer's address. 
By creating this subscription you will be notified by Crypto APIs 2.0 when that event occurs. The information is returned per specified address.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.ETHEREUM;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 
 const data = client.createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D').then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**callbackUrl** | **String**| Represents the URL that is set by the customer where the callback will be received at. The callback notification will be received only if and when the event occurs. |
**address** | **String**| Represents the address of the transaction, per which the result is returned. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

SubscriptionForUnconfirmedCoinsTxsDTO

### Authorization

[ApiKey](#ApiKey)

## createSubscriptionForUnconfirmedTokensTxs
Create callback subscriptions for a specific event. In this case the event called when there are new unconfirmed tokens transactions for the user. 
By creating this subscription you will be notified by Crypto APIs 2.0 when that event occurs. The information is returned per specified address.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.ETHEREUM;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 
 const data = client.createSubscriptionForUnconfirmedTokensTxs(callbackUrl,'0x6EBaF477F83E055589C1188bCC6DDCCD8C9B131a', '').then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**callbackUrl** | **String**| Represents the URL that is set by the customer where the callback will be received at. The callback notification will be received only if and when the event occurs. |
**address** | **String**| Represents the address of the transaction, per which the result is returned. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

SubscriptionForUnconfirmedTokensTxsDTO

### Authorization

[ApiKey](#ApiKey)

## createSubscriptionForUnconfirmedInternalTxs
Create callback subscriptions for a specific event. In this case the event called when there are new unconfirmed coins transactions for the user.
By creating this subscription you will be notified by Crypto APIs 2.0 when that event occurs. The information is returned per specified address.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.ETHEREUM;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 
 const data = client.createSubscriptionForUnconfirmedInternalTxs(callbackUrl,'0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836').then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**callbackUrl** | **String**| Represents the URL that is set by the customer where the callback will be received at. The callback notification will be received only if and when the event occurs. |
**address** | **String**| Represents the address of the transaction, per which the result is returned. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

SubscriptionForUnconfirmedInternalTxsDTO

### Authorization

[ApiKey](#ApiKey)

## broadcastedTransactionCallback

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);

 try {
     const data = client.broadcastedTransactionCallback('8888f6c8168ff69aaf6438ab185c690e8c76c63e5f9c472c1c86f08406ea74f2');
 } catch (e) {
     console.log(e.message);
 }
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**transactionId** | **String**| String identifier of the transaction |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

ParseBroadcastedTransactionCallbackDTO

### Authorization

[ApiKey](#ApiKey)

## broadcastSignedTx
broadcast locally signed transaction

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[api.blockchains.BITCOIN].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 
 const data = client.broadcastSignedTx(callbackUrl,'347d96855d41b77f1e23048fff11c18e9fe699ee69b0b402338f34189734e0a2').then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**transactionId** | **String**| String identifier of the transaction |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

ParseBroadcastedTransactionCallbackDTO

### Authorization

[ApiKey](#ApiKey)

### ApiKey

- **Type**: API key
- **API key parameter name**: x-api-key
- **Location**: HTTP header