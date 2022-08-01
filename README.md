# Crypto APIs - Key Management System Tool (KMS)

Crypto APIs KMS (Key Management System) is an open-source JavaScript. It gives companies full custody of master private keys, master seeds, and mnemonics. The library allows businesses to create HD wallets (xPubs) and sign transactions locally without a network connection (offline). It can be used in combination with Crypto APIs product suite for syncing xPub, deriving wallet addresses, listing wallet addresses, getting fee recommendations, preparing the transaction with the right data, broadcasting locally signed transactions.
The KMS is perfect for B2C companies, including hardware wallets and digital wallets, as well as custodial or non-custodial exchanges. By using Crypto API's open-source library, they can easily scale to satisfy the demand and create wallets for millions of users. The businesses can decide whether to hold custody of their clients' master keys, master seed, and mnemonic or give them to their customers instead.

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

## createWallet

This method generates a new XPUB for a specific blockchain and network. The response from the endpoint should be stored,
otherwise the data is lost and cannot be recovered.

### Example

```javascript
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const walletService = new WalletService(blockchain, network)

 walletService.createHDWallet().then((data) => {
    console.dir('HD Wallet created successfully. Returned data:');
    console.dir(data);
    console.dir(data.xPub.accountXpriv);
    console.dir(data.xPub.accountXpub);
 }, (error) => {
    console.log(error)
 });

```

### Return type

WalletDTO

### Authorization

[ApiKey](#ApiKey)

## syncNewHDWallet
After initial sync we keep updating the synced xpub all the time.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

 client.syncNewHDWallet(xPub).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
    console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**xPub** | **String**| Defines the account extended publicly known key which is used to derive all child public keys. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

hdWalletDTO

### Authorization

[ApiKey](#ApiKey)

## deriveAndSyncNewChangeAddresses
Through this endpoint users can derive 100 change addresses, starting from the last index we have data for, 
which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, 
it will start from index 0.
### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

 client.deriveAndSyncNewChangeAddresses(xPub).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
    console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**xPub** | **String**| Defines the account extended publicly known key which is used to derive all child public keys. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

hdWalletDTO

### Authorization

[ApiKey](#ApiKey)


## deriveAndSyncNewReceivingAddresses
Through this endpoint users can derive 100 receiving addresses, starting from the last index we have data for, 
which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will 
start from index 0.
### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

 client.deriveAndSyncNewReceivingAddresses(xPub).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
    console.log(error);
 });
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**xPub** | **String**| Defines the account extended publicly known key which is used to derive all child public keys. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

hdWalletDTO

### Authorization

[ApiKey](#ApiKey)


## listSyncedAddresses
Through this endpoint users can list all addresses that Crypto APIs has synced for a specific xPub. This includes
previous and current/new xPubs, what addresses we’ve synced for them, etc.
### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';
 const opts = {
            context: 'yourExampleString',
            addressFormat: "P2WPKH",
            isChangeAddress: true,
            limit: 15,
       };
 client.listSyncedAddresses(xPub, opts).then((data) => {
      console.dir('API called successfully. Returned data:');
      console.dir(data);
 }, (error) => {
      console.log(error);
 });
```

### Parameters

Name | Type       | Description | Notes
------------- |------------| ------------ | -------------
**xPub** | **String** | Defines the account extended publicly known key which is used to derive all child public keys. |
**opts** | **Object** | Optional parameters | [optional]
**opts.context** | **String** | In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]
**opts.addressFormat** | **String** | Defines if the address is change addres or not. (default to true) | [optional]
**opts.isChangeAddress** | **String** | Represents the format of the address | [optional]
**opts.limit** | **String** | Defines how many items should be returned in the response per page basis. | [optional]
**opts.offset** | **String** | The starting index of the response items, i.e. where the response should start listing the returned items | [optional]

### Return type

ListSyncedAddressesDTO

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

## prepareUTXOBasedTransactionFromHDWallet
Through the “Prepare a UTXO-based transaction from HD Wallet” endpoint users can prepare a transaction for
signing from all synced with Crypto APIs addresses for the specific xPub. This is based on the 
`selectionStrategy` and the addresses’ balances. In the case a user has an address not synced with Crypto APIs, 
it will not be included. This endpoint applies to all supported UTXO-based blockchain protocols, e.g. Bitcoin, 
Litecoin, etc.

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = "xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB"
 const feeOptions = new UTXOBasedFeeOptions({
    prepareStrategy: 'MINIMIZE_DUST',
    priority: feePriorityEnum.FAST,
 });
 const recipients = [ 
     new Recipients("tb1q8qrk9pxkjcuk4a29ec7snskaxll55jzfhrcq24", '0.000031')
 ];

 const preparedUTXOTransaction = await client.prepareUTXOBasedTransactionFromHDWallet({
     xPub: xPub,
     recipients: recipients,
     feeOptions,
 }).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error)
 })
```

### Parameters

Name | Type                     | Description                                                          | Notes
------------- |--------------------------|----------------------------------------------------------------------| -------------
**xPub** | **String**               | Account Extended Public Key                                          | 
**recipients** | **Array<**Recipient**>** | Represents a list of recipient addresses with the respective amounts |
**feeOptions** | **UTXOBasedFeeOptions**  | Represents the fee options                                           |
**feeOptions.address** | **string**               | Represents the fee address                                           | [optional]
**feeOptions.priority** | **string**               | Represents the fee priority                                          | [optional]
**feeOptions.feeAmount** | **string**               | Represents the fee amount                                            | [optional]
**locktime** | **Number**               | Represents the time at which a particular transaction can be added to the blockchain              | [optional]
**replaceable** | **Boolean**              | Representation of whether the transaction is replaceable           | [optional]
**data** | **string**               | Representation of the additional data          | [optional]

### Return type

UTXOBasedTransactionDTO

### Authorization

[ApiKey](#ApiKey)

## prepareAccountBasedTransactionFromHDWallet
Through the “Prepare an account-based transaction from HD Wallet” endpoint users can prepare a transaction for
signing from a synced with Crypto APIs address from the specific xPub. This endpoint applies to all supported 
account-based blockchain protocols, e.g. Ethereum, BSC, etc

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.ETHEREUM;
 const network = api.networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const xPub = "xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB
 const sender = '0x0b7155094947d785530f66d250b097b25c30a557';
 const recipient = '0xd4e2a5949359e95c7c604050dd9d54af419689c0';
 const amount = '1.2123';
 const feeOptions = new AccountBasedFeeOptions({
    priority: feePriorityEnum.FAST,
 });
 const preparedAccountTransaction = await client.prepareAccountBasedTransactionFromHDWallet({
     xPub,
     sender,
     recipient,
     amount,
     feeOptions
 }).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error)
 })
```

### Parameters

Name | Type                    | Description                                                          | Notes
------------- |-------------------------|----------------------------------------------------------------------| -------------
**xPub** | **string**              | Account Extended Public Key                                          |
**sender** | **string**              | Represents a sender address                                       |
**recipient** | **string**              | Represents a recipient addresses  |
**amount** | **string**              | Representation of the amount of the transaction  |
**feeOptions** | **UTXOBasedFeeOptions** | Represents the fee options                                           |
**feeOptions.priority** | **string**              | Represents the fee priority                                          | [optional]
**feeOptions.feeAmount** | **string**              | Represents the fee amount                                            | [optional]
**nonce** | **string**              | Representation of the nonce value            | [optional]
**data** | **string**              | Representation of the additional data          | [optional]

### Return type

AccountBasedTransactionDTO

### Authorization

[ApiKey](#ApiKey)

## signPreparedTransactionLocally
Through this endpoint users sign their transactions locally(offline) using the transaction response from 
Prepare Transaction From XPUB endpoint, both for account-based and UTXO-based

### Example

```javascript
 const api = require('../src/');
 const blockchain = api.blockchains.BITCOIN;
 const network = api.networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new api.client('YOUR API KEY', blockchain, network);
 const preparedUTXO = await client.prepareUTXOBasedTransactionFromXpub({...})
 const accountXpriv = 'xprv8gdau6KURKnX7mcKNjLMWx3a3tEzHCMiJDBtFCJrvmXCsHNj3wvSuJ3T8g67WvN9hkFa4y1Mnr9ZbyUzs9fdhi8mhegLufkEuwSdmDeBXvz';

 client.signPreparedTransactionLocally(accountXpriv, preparedUTXO).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error);
 });
```

### Parameters

Name | Type               | Description                                                  | Notes
------------- |--------------------|--------------------------------------------------------------| -------------
**accountXpriv** | **String**         | Account Extended Private Key                                 |
**transaction** | **TransactionDTO** | Prepared Transaction From Xpub (Account-based or UTXO-based) |

### Return type

SignDTO

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
 const signedTx = client.signPreparedTransactionLocally(xpriv, preparedUTXOtx)
 const callbackSecretKey = 'yourSecretString';
 const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard  
 
 client.broadcastSignedTx(signedTx.raw, callbackSecretKey, callbackUrl).then((data) => {
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

### ApiKey

- **Type**: API key
- **API key parameter name**: x-api-key
- **Location**: HTTP header