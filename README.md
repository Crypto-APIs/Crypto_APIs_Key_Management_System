# ⚠️ SDK Deprecation Notice

> **Status:** Archived & Deprecated  
> **Effective Date:** 1st April, 2025

---

This SDK has been officially **deprecated** and is no longer actively maintained or updated.

To give you more flexibility, we recommend generating your own SDK using our official **OpenAPI specification**, available for download from the Crypto APIs Developer Portal:

👉 [https://developers.cryptoapis.io/](https://developers.cryptoapis.io/)

---

## 💡 Recommended Approach

You can easily generate SDKs in most major programming languages using tools such as:

- [OpenAPI Generator](https://openapi-generator.tech/)
- [Swagger Codegen](https://swagger.io/tools/swagger-codegen/)

Simply use our OpenAPI JSON to create SDKs tailored to your specific needs.

---

This repository will remain available for reference but is no longer supported.

For questions, please contact us via our official support channels.

---

_Thank you for your understanding and for building with Crypto APIs!_


# Crypto APIs - Key Management System Tool (KMS)

Crypto APIs KMS (Key Management System) is an open-source Node.js library. It gives companies full custody of master private keys, master seeds, and mnemonics. The library allows businesses to create HD wallets (xPubs) and sign transactions locally without a network connection (offline). It can be used in combination with Crypto APIs product suite for syncing xPub, deriving wallet addresses, listing wallet addresses, getting fee recommendations, preparing the transaction with the right data, broadcasting locally signed transactions.
The KMS is perfect for B2C companies, including hardware wallets and digital wallets, as well as custodial or non-custodial exchanges. By using Crypto API's open-source library, they can easily scale to satisfy the demand and create wallets for millions of users. The businesses can decide whether to hold custody of their clients' master keys, master seed, and mnemonic or give them to their customers instead.

- Package version: 0.7.2
- For more information, please visit [https://cryptoapis.io](https://cryptoapis.io)
- minimum requirement NodeJS >= 14.0

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

Then install it via:

```shell
npm install cryptoapis-kms
```

## Usage

## generateAddress
This method generates and returns a new public and private key pair, and the associated address with it.

### Example

```javascript
 const { Enumerations, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;

 const addressService = new Services.AddressService(blockchain, network)
 const address = addressService.generateAddress();
 console.dir('New address generated successfully. Returned data:');
 console.dir(address)
 console.dir(address.address)
 console.dir(address.privateKey)
 console.dir(address.publicKey)
```

### Return type

AddressDTO

## createHDWallet (xPub, yPub, zPub)
This method generates a new HD Wallet for a specific blockchain and network. The response from the endpoint should be stored,
otherwise the data is lost and cannot be recovered.

`zPub`(bip84) is supported only by bitcoin and litecoin.

### Example

```javascript
 const { Enumerations, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;

 (async () => {
   const walletService = new Services.WalletService(blockchain, network);
   const wallet = await walletService.createHDWallet().then((data) => {
         console.dir('HD Wallet created successfully. Returned data:');
         console.dir(data);
         console.dir(data.xPub.accountXpriv);
         console.dir(data.xPub.accountXpub);
   }, (error) => {
      console.log(error)
   });
 })();
```

### Parameters

Name | Type       | Description                                                      | Notes
------------- |------------|------------------------------------------------------------------| -------------
**mnemonicWordsCount** | **Number** | Mnemonic words count. Possible values are 12(default), 18 or 24. | [optional]


### Return type

WalletDTO

## syncNewHDWallet (xPub, yPub, zPub)
After initial sync we keep updating the synced xpub all the time.

### Example

```javascript
 const {Enumerations, Client, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
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

HDWalletDTO

### Authorization

[ApiKey](#ApiKey)

## deriveAndSyncNewChangeAddresses
Through this endpoint users can derive 100 change addresses, starting from the last index we have data for, 
which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, 
it will start from index 0.
### Example

```javascript
 const {Enumerations, Client, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
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

HDWalletDTO

### Authorization

[ApiKey](#ApiKey)


## deriveAndSyncNewReceivingAddresses
Through this endpoint users can derive 100 receiving addresses, starting from the last index we have data for, 
which are then added to the xPub, subscribed for syncing, and start recording data. If no data is available, it will 
start from index 0.
### Example

```javascript
 const {Enumerations, Client, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
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

HDWalletDTO

### Authorization

[ApiKey](#ApiKey)


## listSyncedAddresses
Through this endpoint users can list all addresses that Crypto APIs has synced for a specific xPub. This includes
previous and current/new xPubs, what addresses we’ve synced for them, etc.
### Example

```javascript
 const {Enumerations, Client, Services } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
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

## prepareUTXOBasedTransactionFromHDWallet (xPub, yPub, zPub)
Through the “Prepare a UTXO-based transaction from HD Wallet” endpoint users can prepare a transaction for
signing from all synced with Crypto APIs addresses for the specific xPub. This is based on the 
`selectionStrategy` and the addresses’ balances. In the case a user has an address not synced with Crypto APIs, 
it will not be included. This endpoint applies to all supported UTXO-based blockchain protocols, e.g. Bitcoin, 
Litecoin, etc.

### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const xPub = "xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB"
 const feeOptions = new Models.UTXOBasedFeeOptionsModel({
    prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
    priority: Enumerations.FeePriorities.FAST,
 });
 const recipients = [ 
     new Models.RecipientModel("tb1q8qrk9pxkjcuk4a29ec7snskaxll55jzfhrcq24", '0.000031')
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
**recipients** | **Array<**RecipientModel**>** | Represents a list of recipient addresses with the respective amounts |
**feeOptions** | **UTXOBasedFeeOptionsModel**  | Represents the fee options                                           |
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

## prepareAccountBasedTransactionFromHDWallet (xPub, yPub, zPub)
Through the “Prepare an account-based transaction from HD Wallet” endpoint users can prepare a transaction for
signing from a synced with Crypto APIs address from the specific xPub. This endpoint applies to all supported 
account-based blockchain protocols, e.g. Ethereum, BSC, etc

### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.ETHEREUM;
 const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const xPub = "xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB
 const sender = '0x0b7155094947d785530f66d250b097b25c30a557';
 const recipient = '0xd4e2a5949359e95c7c604050dd9d54af419689c0';
 const amount = '1.2123';
 const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,
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
**feeOptions** | **AccountBasedFeeOptionsModel** | Represents the fee options                                           |
**feeOptions.priority** | **string**              | Represents the fee priority                                          | [optional]
**feeOptions.feeAmount** | **string**              | Represents the fee amount                                            | [optional]
**nonce** | **string**              | Representation of the nonce value            | [optional]
**data** | **string**              | Representation of the additional data          | [optional]

### Return type

AccountBasedTransactionDTO

### Authorization

[ApiKey](#ApiKey)

## prepareAFungibleTokenTransferFromAddress (ERC-20, BEP-20)
This endpoint is used to prepare a fungible token transfer from an address with private and public keys.
The address does not have to belong to a wallet. The response will include the transaction fee in Wei

### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.ETHEREUM;
 const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const sender = '0xc56c1baA10746268785018e9AAB081957b1B9F6f';
 const contract = '0x5690B49D818c940A7E6B9FA26B717AdA00394fF4';
 const recipient = '0xe9be409b2f52deb3dc24508895cb4ee8c468ac19';
 const amount = '1.2123';
 const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,
 });
const tokenStandard = Enumerations.TokenStandards[blockchain].ERC_20;

const preparedAccountTransaction = await client.prepareTokenTransaction({
    tokenStandard,
    contract,
    sender,
    recipient,
    amount,
    feeOptions,
 }).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error)
 })
```

### Parameters

Name | Type                    | Description                                     | Notes
------------- |-------------------------|-------------------------------------------------| -------------
**tokenStandard** | **enum**                | Represents the token standard                   |
**contract** | **string**              | Represents a contract address                   |
**sender** | **string**              | Represents a sender address                     |
**recipient** | **string**              | Represents a recipient addresses                |
**amount** | **string**              | Representation of the amount of the transaction |
**feeOptions** | **AccountBasedFeeOptionsModel** | Represents the fee options                      |
**feeOptions.priority** | **string**              | Represents the fee priority                     | [optional]
**feeOptions.feeAmount** | **string**              | Represents the fee amount                       | [optional]
**nonce** | **string**              | Representation of the nonce value               | [optional]
**data** | **string**              | Representation of the additional data           | [optional]

### Return type

AccountBasedTransactionDTO

### Authorization

[ApiKey](#ApiKey)

## prepareANonFungibleTokenTransferFromAddress (ERC-721, BEP-721)
This endpoint is used to prepare a non-fungible token transfer from an address with private and public keys.
The address doesn’t have to belong to a wallet. The response will include the transaction fee in Wei.
### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.ETHEREUM;
 const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const sender = '0xc56c1baA10746268785018e9AAB081957b1B9F6f';
 const contract = '0x5690B49D818c940A7E6B9FA26B717AdA00394fF4';
 const recipient = '0xe9be409b2f52deb3dc24508895cb4ee8c468ac19';
 const tokenId = '3';
 const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,
 });
const tokenStandard = Enumerations.TokenStandards[blockchain].ERC_721;

const preparedAccountTransaction = await client.prepareTokenTransaction({
    tokenStandard,
    contract,
    sender,
    recipient,
    tokenId,
    feeOptions,
 }).then((data) => {
     console.dir('API called successfully. Returned data:');
     console.dir(data);
 }, (error) => {
     console.log(error)
 })
```

### Parameters

Name | Type                    | Description                           | Notes
------------- |-------------------------|---------------------------------------| -------------
**tokenStandard** | **enum**                | Represents the token standard         |
**contract** | **string**              | Represents a contract address         |
**sender** | **string**              | Represents a sender address           |
**recipient** | **string**              | Represents a recipient addresses      |
**tokenId** | **string**              | Representation of the token id        |
**feeOptions** | **AccountBasedFeeOptionsModel** | Represents the fee options            |
**feeOptions.priority** | **string**              | Represents the fee priority           | [optional]
**feeOptions.feeAmount** | **string**              | Represents the fee amount             | [optional]
**nonce** | **string**              | Representation of the nonce value     | [optional]
**data** | **string**              | Representation of the additional data | [optional]

### Return type

AccountBasedTransactionDTO

### Authorization

[ApiKey](#ApiKey)


## prepareAccountBasedTransactionFromAddress
Through this endpoint users can prepare a transaction from an address with private and public keys.
The address does not have to belong to a wallet. The response will include the transaction fee in Wei.

### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.ETHEREUM;
 const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const sender = '0x0b7155094947d785530f66d250b097b25c30a557';
 const recipient = '0xd4e2a5949359e95c7c604050dd9d54af419689c0';
 const amount = '1.00031246';
 const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,
 });
 const preparedAccountTransaction = await client.prepareAccountBasedTransactionFromAddress({
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
**sender** | **string**              | Represents a sender address                                       |
**recipient** | **string**              | Represents a recipient addresses  |
**amount** | **string**              | Representation of the amount of the transaction  |
**feeOptions** | **AccountBasedFeeOptionsModel** | Represents the fee options                                           |
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
Prepare Transaction From HD Wallet endpoint, both for account-based and UTXO-based

### Example #1

```javascript
const {Enumerations, Client, Services, Models} = require('cryptoapis-kms');
const blockchain = Enumerations.Blockchains.BITCOIN;
const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
const client = new Client('YOUR API KEY', blockchain, network);
const signService = new Services.SignService(blockchain, network)
const accountXpriv = 'xprv8gdau6KURKnX7mcKNjLMWx3a3tEzHCMiJDBtFCJrvmXCsHNj3wvSuJ3T8g67WvN9hkFa4y1Mnr9ZbyUzs9fdhi8mhegLufkEuwSdmDeBXvz';
const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

const preparedUTXO = await client.prepareUTXOBasedTransactionFromHDWallet({
    xPub: xPub,
    recipients: [
        new Models.RecipientModel("tb1q8qrk9pxkjcuk4a29ec7snskaxll55jzfhrcq24", '0.000031')
    ],
    feeOptions: new Models.UTXOBasedFeeOptionsModel({
        prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
        priority: Enumerations.FeePriorities.FAST,
    })
});

const signedTx = signService.signPreparedTransactionLocally(accountXpriv, preparedUTXO);
const callbackSecretKey = 'yourSecretString';
const callbackUrl = 'https://example.com'; // your URL for callback must be verifyed from dashboard  

client.broadcastSignedTx(signedTx.raw, callbackSecretKey, callbackUrl).then((data) => {
    console.dir('API called successfully. Returned data:');
    console.dir(data);
}, (error) => {
    console.log(error);
});
```

### Example #2

```javascript
const {Enumerations, Client, Services, Models} = require('cryptoapis-kms');
const blockchain = Enumerations.Blockchains.ETHEREUM;
const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_MAINNET;
const client = new Client('YOUR API KEY', blockchain, network);
const signService = new Services.SignService(blockchain, network)
const privKey = '1f610a431f8d997484e6aab36cf7e185eb069aac65fdce81e82d39ba85848c12';
const sender = '0x0b7155094947d785530f66d250b097b25c30a557';
const recipient = '0xd4e2a5949359e95c7c604050dd9d54af419689c0';
const amount = '1.00031246';
const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,
});

const preparedAccountTransaction = await client.prepareAccountBasedTransactionFromAddress({
    sender,
    recipient,
    amount,
    feeOptions
})

const signedTx = signService.signPreparedTransactionLocally(privKey, preparedAccountTransaction);
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

Name | Type               | Description                                                  | Notes
------------- |--------------------|--------------------------------------------------------------| -------------
**accountXpriv** | **String**         | Account Extended Private Key (for HDWallet Transactions)     |
**privKey** | **String**         | Address Private Key (for Address Transactions)               |
**transaction** | **TransactionDTO** | Prepared Transaction (Account-based or UTXO-based) |

### Return type

SignDTO

### Authorization

[ApiKey](#ApiKey)

## broadcastSignedTx
broadcast locally signed transaction

### Example

```javascript
 const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
 const blockchain = Enumerations.Blockchains.BITCOIN;
 const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
 const client = new Client('YOUR API KEY', blockchain, network);
 const signService = new Services.SignService(blockchain, network)
 const accountXpriv = 'xprv8gdau6KURKnX7mcKNjLMWx3a3tEzHCMiJDBtFCJrvmXCsHNj3wvSuJ3T8g67WvN9hkFa4y1Mnr9ZbyUzs9fdhi8mhegLufkEuwSdmDeBXvz';
 const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

 const preparedUTXO = await client.prepareUTXOBasedTransactionFromHDWallet({
     xPub: xPub,
     recipients: [
         new Models.RecipientModel("tb1q8qrk9pxkjcuk4a29ec7snskaxll55jzfhrcq24", '0.000031')
     ],
     feeOptions: new Models.UTXOBasedFeeOptionsModel({
         prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
         priority: Enumerations.FeePriorities.FAST,
     })
 });

 const signedTx = signService.signPreparedTransactionLocally(accountXpriv, preparedUTXO);
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
**signedTransactionHex** | **String**| String identifier of the transaction |
**callbackSecretKey** | **String**| Represents the Secret Key value provided by the customer. This field is used for security purposes during the callback notification, in order to prove the sender of the callback as Crypto APIs |
**callbackUrl** | **String**| Represents the URL that is set by the customer where the callback will be received at. The callback notification will be received only if and when the event occurs. |
**context** | **String**| In batch situations the user can use the context to correlate responses with requests. This property is present regardless of whether the response was successful or returned as an error. &#x60;context&#x60; is specified by the user. | [optional]

### Return type

BroadcastSignedTxDTO

### Authorization

[ApiKey](#ApiKey)

## ApiKey

- **Type**: API key
- **API key parameter name**: x-api-key
- **Location**: HTTP header

## Contributing

Anyone who wants to contribute is welcome. Use the Issues as a way to make suggestions that you want to see or even want to create.
