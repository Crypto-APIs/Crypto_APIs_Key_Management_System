const { Enumerations, Client, Services } = require('./index');
const blockchain = Enumerations.Blockchains.DASH;
const network = Enumerations.Networks[blockchain].NETWORK_DASH_TESTNET;
const client = new Client('ca75ab4a773fd2ba608acd1a2d7c4b040351702b', blockchain, network);

// (async () => {
//     const walletService = new Services.WalletService(blockchain, network);
//     const wallet = await walletService.createHDWallet().then((data) => {
//         console.dir('HD Wallet created successfully. Returned data:');
//         console.dir(data);
//         console.dir(data.xPub.accountXpriv);
//         console.dir(data.xPub.accountXpub);
//     }, (error) => {
//         console.log(error)
//     });
// })();
// const xPub = 'xpub6D9Bshpst7nZfMiWrGZzibiGYcTpBt8kFLipRyiQisM5Qu2Wn37546zfkxAM4nnUoCx3iDcSV1NLDX9PsqMVuUrj7VNY8gnoPYdDGQo6L7N';
//xprv9z9qUCHz3kEGSse3kF2zMTmXzadKnRQtt7oDdbJoAXp6Y6hNEVnpWJgBuhsBC6ajK1gDzuaaHzmUQtsD5CWUHYZgZvVJdLXpm1XAdabHuot
//0x3e0d2e4ac6fee472a2b48422782609e435cecd2f
//0xddec3e85b2f0f6db498624322a34cc6b41b4b5b3
// const tpub = "tpubDD5vmM28LUdyK3BmQEPZ8UWfFRZR6psR272ckKThzoX6FwsFTf6j38nmt9QBZztzseX8EehSrqRCigjrhcT5M3ee7ad2ikBB9t6n9aAQJox"
// client.deriveAndSyncNewChangeAddresses(tpub).then((data) => {
//     console.dir('API called successfully. Returned data:');
//     console.dir(JSON.stringify(data));
// }, (error) => {
//     console.log(error);
// });
//tb1qgvznwv33cg0dycjxajts48qdtd6k96l92p95en
//tb1q2yukzykjvd4h373mqe8h77r2d73cyzjx3hlgy4
//tb1q7lxaavxsphnwxmly6ljthneekvs7canpa9k7ks
const tpub = "tpubDCMwqEVks5AXkuHCXJaVZuzG2y9g3nPavsANUHVaXgziUbi8CSXq35KdDgepUrU2zjdC6NJVJmxnWgxvgQKU6b3YSKKA8a9dPNLcpUo9rFu"
client.deriveAndSyncNewChangeAddresses(tpub).then((data) => {
    console.dir('API called successfully. Returned data:');
    console.dir(JSON.stringify(data));
}, (error) => {
    console.log(error);
});