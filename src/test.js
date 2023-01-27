const {Enumerations, Client, Services, Models} = require('./index');
const hex2dec = require("hex2dec");
const blockchain = Enumerations.Blockchains.ETHEREUM;
const network = Enumerations.Networks[blockchain].NETWORK_ETHEREUM_GOERLI;
const signService = new Services.SignService(blockchain, network)
const client = new Client('6b43f936de4c3af533def7ee3ecd830e9cc23fb2', blockchain, network);

// const addressService = new Services.AddressService(blockchain, network)
// const address = addressService.generateAddress();
// console.dir('New address generated successfully. Returned data:');
// console.dir(address)
// console.dir(address.address)
// console.dir(address.privateKey)
// console.dir(address.publicKey)

const tokenStandard = Enumerations.TokenStandards[blockchain].ERC_20;

const contract = '0x6923F460fF0722fC4CC7e1dAFC8aBaE18E9b2626';
// const contract = '0x5690B49D818c940A7E6B9FA26B717AdA00394fF4';
const sender = '0xc56c1baA10746268785018e9AAB081957b1B9F6f';
// const recipient = '0xc56c1baA10746268785018e9AAB081957b1B9F6f';
const recipient = '0xe9be409b2f52deb3dc24508895cb4ee8c468ac19';
// const sender = '0xe9be409b2f52deb3dc24508895cb4ee8c468ac19';
const amount = '0.00031246';
// const nonce = '4'
const tokenId = '3';
const feeOptions = new Models.AccountBasedFeeOptionsModel({
    priority: Enumerations.FeePriorities.FAST,

});

(async () => {
    // const prepareTokenTransaction = await client.prepareTokenTransaction({
    //     tokenStandard,
    //     contract,
    //     sender,
    //     recipient,
    //     tokenId,
    //     feeOptions,
    //     amount,
    // })
    // console.log('\n signedTx', prepareTokenTransaction)
  //   const xPub = 'xpub6D9Bshpst7nZfMiWrGZzibiGYcTpBt8kFLipRyiQisM5Qu2Wn37546zfkxAM4nnUoCx3iDcSV1NLDX9PsqMVuUrj7VNY8gnoPYdDGQo6L7N';
  //   const xPriv = 'xprv9z9qUCHz3kEGSse3kF2zMTmXzadKnRQtt7oDdbJoAXp6Y6hNEVnpWJgBuhsBC6ajK1gDzuaaHzmUQtsD5CWUHYZgZvVJdLXpm1XAdabHuot'
  //   const from = '0x3e0d2e4ac6fee472a2b48422782609e435cecd2f'
  //   const to = '0xba24143fc908d0e293d43d351a9acdf16ad0618d'
  //   const am = "0.0003";
  //   const data = "0101010101"
  //   const prepareTransaction = await client.prepareAccountBasedTransactionFromHDWallet({
  //       xPub,
  //       sender: from,
  //       recipient: to,
  //       amount: am,
  //       feeOptions,
  //       data:data,
  // })

    const prepareTokenTransaction = await client.prepareAccountBasedTransactionFromAddress({
        sender,
        recipient,
        feeOptions,
        amount,
    })
    const privKey = "1f610a431f1d997484e6aae46cf7e185eb069aac65fdce81e82d39ba85848c11"
    // const privKey = "51112757eeac4255257d03aa4f2f08006baa409dfbc42c4bee9a19f15f1e9054"
    const signedTx = signService.signPreparedTransactionLocally(privKey, prepareTokenTransaction);
    console.log('\n signedTx', signedTx)
    // const signedTx = signService.signPreparedTransactionLocally(xPriv, prepareTransaction);
    // console.log('\n signedTx', signedTx)
    client.broadcastSignedTx(signedTx.raw).then((data) => {
        console.dir('API called successfully. Returned data:');
        console.dir(data);
        console.dir(data.item);
    }, (error) => {
        console.log(error);
    });
    /*
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
     */
    // const {Enumerations, Client, Services, Models } = require('cryptoapis-kms');
    // const blockchain = Enumerations.Blockchains.BITCOIN;
    // const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
    // const client = new Client('79794ed313dc819e1834800049ee418652f5c26b', blockchain, network);
    // const xPub = "xpub6DXgtKsnXrt2B7cCz7r8zvRKkVd1dNgcpojeesuY4cRqXWcot5JZSntgyAN2ANP5WLpG9gSxZjj4tGTbpDU6RbzUemvWM8qpKC83ZF77ifs"
    // const feeOptions = new Models.UTXOBasedFeeOptionsModel({
    //     prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
    //     priority: Enumerations.FeePriorities.FAST,
    // });
    // const recipients = [
    //     new Models.RecipientModel("bc1q7k5mrnxpgnl45lf8xsar5pyerck5wetfnkl96f", "0.000031")
    // ];
    //
    // const preparedUTXOTransaction = await client.prepareUTXOBasedTransactionFromHDWallet({
    //     xPub: xPub,
    //     recipients: recipients,
    //     feeOptions,
    //     replaceable: false,
    // }).then((data) => {
    //     console.dir('API called successfully. Returned data:');
    //     console.dir(data);
    //     // signFunction();
    // }, (error) => {
    //     console.log(error)
    // })
    //
    // console.log('\n preparedUTXOTransaction', preparedUTXOTransaction)
})();

//
// const prepare = {
//     sender: '0xc56c1baa10746268785018e9aab081957b1b9f6f',
//     transactionType: '0x2',
//     recipient: '0x5690b49d818c940a7e6b9fa26b717ada00394ff4',
//     amount: '0x0',
//     nonce: '0xA',
//     gasPrice: 18250372153,
//     gasLimit: 79313,
//     maxFeePerGas: 21331623463,
//     maxPriorityFeePerGas: 8959789170,
//     data: '0x23b872dd000000000000000000000000c56c1baa10746268785018e9aab081957b1b9f6f000000000000000000000000e9be409b2f52deb3dc24508895cb4ee8c468ac190000000000000000000000000000000000000000000000000000000000000002'
// }
//
// const accountXpriv = '1f610a431f1d997484e6aae46cf7e185eb069aac65fdce81e82d39ba85848c11';
// const signedTx = signService.signPreparedTransactionLocally(accountXpriv, prepare);
// console.log('\n signedTx', signedTx)
//
// client.broadcastSignedTx(signedTx.raw).then((data) => {
//     console.dir('API called successfully. Returned data:');
//     console.dir(data);
//     console.dir(data.item);
// }, (error) => {
//     console.log(error);
// });