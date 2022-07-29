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
const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
const client = new api.client('YOUR API KEY', blockchain, network);
 
client.createWallet().then((data) => {
    console.dir('API called successfully. Returned data:');
    console.dir(data);
}, (error) => {
    console.log(error)
});

```

### Return type

WalletDTO

### Authorization

[ApiKey](#ApiKey)

## syncNewXPub
After initial sync we keep updating the synced HD wallets all the time.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const exPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

 client.syncNewXPub(exPub).then((data) => {
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
 const network = api.networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard
 
 client.createSubscriptionForUnconfirmedCoinsTxs(callbackUrl, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D').then((data) => {
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
 const network = api.networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard
 
 client.createSubscriptionForUnconfirmedTokensTxs(callbackUrl, '0x6EBaF477F83E055589C1188bCC6DDCCD8C9B131a').then((data) => {
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
 const network = api.networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard
 
 client.createSubscriptionForUnconfirmedInternalTxs(callbackUrl, '0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836').then((data) => {
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
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
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

BroadcastedTransactionCallbackDTO

### Authorization

[ApiKey](#ApiKey)

## broadcastSignedTx
broadcast locally signed transaction

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const transactionHex = '0xf86a22827d00831e8480941b85a43e2e7f52e766ddfdfa2b901c42cb1201be8801b27f33b807c0008029a084ccbf02b27e0842fb1eda7a187a5589c3759be0e969e0ca989dc469a5e5e394a02e111e1156b197f1de4c1d9ba4af26e50665ea6d617d05b3e4047da12b915e69';
 const callbackSecretKey = 'yourSecretString';
 const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard  
 
 client.broadcastSignedTx(transactionHex, callbackSecretKey, callbackUrl).then((data) => {
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
**callbackSecretKey** | **String**| Represents the Secret Key value provided by the customer. This field is used for security purposes during the callback notification, in order to prove the sender of the callback as Crypto APIs |
**callbackUrl** | **String**| Represents the URL that is set by the customer where the callback will be received at. The callback notification will be received only if and when the event occurs. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

broadcastSignedTxDTO

### Authorization

[ApiKey](#ApiKey)

## Derive HD Wallet (xPub, yPub, zPub) Change Or Receiving Addresses

Derive up to 10 addresses - both change and receive, from a certain HD Wallet (xPub, yPub, zPub), by providing an extended public key. By default, 
the system creates a receiving/deposit address, unless the isChange attribute is set to 'true'. In that case the system derives a 'change' address. 
The change address can be derived only for UTXO based blockchains, for all the rest, this endpoint always creates a deposit/receiving address.

### Example

```javascript
const api = require('./src/');
const blockchain = api.blockchains.BITCOIN;
const network = api.networks[blockchain].NETWORK_BITCOIN_TESTNET;
const client = new api.client('YOUR API KEY', blockchain, network);
const extendedPublicKey = 'upub5Ez55YZxWDUCC9oW5jm38p51QNpwHYuaHcGekjtNTQZ9vktnLK8XDpMy1wRxSsZ6GSgyLAkB2KhcUNRcPgB1tjzZZ11d7wR6DycXLJvdymY'
const opts = {
    context: 'yourExampleString',
    addressesCount: 5,
    isChange: true,
    startIndex: 3,
    addressFormat: 'p2sh'
}

client.deriveHDAddresses(extendedPublicKey, opts).then((data) => {
    console.dir('API called successfully. Returned data:');
    console.dir(data);
}, (error) => {
    console.log(error);
});

```

### Parameters

| Name               | Type       | Description                                                                                                                                                                                                                    | Notes      |
|--------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| **extendedPublicKey**          | **String** | Defines the account extended publicly known key which is used to derive all child public keys.                                                                                                                                 |            |
| **context**        | **String** | In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. `context` is specified by the user. | [optional] |
| **addressFormat**  | **String** | Represents the format of the address.                                                                                                                                                                                          | [optional] |
| **addressesCount** | **Number** | Represents the addresses count.                                                                                                                                                                                                | [optional] |
| **isChange**       | **Boolean** | Defines if the specific address is a change or deposit address. If the value is True - it is a change address, if it is False - it is a Deposit address.                                                                      | [optional] |
| **startIndex**     | **Number** | The starting index of the response items, i.e. where the response should start listing the returned items.                                                                                                                     | [optional] |


### Return type

HdAddressesDTO

### Authorization

[ApiKey](#ApiKey)

### ApiKey

- **Type**: API key
- **API key parameter name**: x-api-key
- **Location**: HTTP header