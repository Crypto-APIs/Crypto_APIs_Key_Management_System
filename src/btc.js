const {Enumerations, Client, Services, Models} = require('./index');
const blockchain = Enumerations.Blockchains.BITCOIN;
const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_TESTNET;
const signService = new Services.SignService(blockchain, network)
const client = new Client('6b43f936de4c3af533def7ee3ecd830e9cc23fb2', blockchain, network);
const tpub = "tpubDD5vmM28LUdyK3BmQEPZ8UWfFRZR6psR272ckKThzoX6FwsFTf6j38nmt9QBZztzseX8EehSrqRCigjrhcT5M3ee7ad2ikBB9t6n9aAQJox"
const feeOptions = new Models.UTXOBasedFeeOptionsModel({
    prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
    priority: Enumerations.FeePriorities.FAST,
});
const recipients = [
    new Models.RecipientModel("tb1q7lxaavxsphnwxmly6ljthneekvs7canpa9k7ks", '0.00031')
];

(async () => {

    await client.prepareUTXOBasedTransactionFromHDWallet({
        xPub: tpub,
        recipients: recipients,
        feeOptions,
    }).then((data) => {
        console.dir('API called successfully. Returned data:');
        console.dir(data);
        console.dir('API called successfully. Returned data:');
        console.dir(data);
        const accountXpriv = "tprv8gPtcvytC6xJRa9yWaixj4rYgQ3UwVgWSoRqToRQaXihRTcUqGH8reAui2qPMayenzX2dgygbPkrxgy2XHCuWJ2sr93vMgxYmGZLTeJ2G1a"
        const signedTx = signService.signPreparedTransactionLocally(accountXpriv, data);
        console.log('\n signedTx', signedTx)

        client.broadcastSignedTx(signedTx.raw).then((data) => {
            console.dir('API called successfully. Returned data:');
            console.dir(data);
            console.dir(data.item);
        }, (error) => {
            console.log(error);
        });
    }, (error) => {
        console.log(error)
    })
})();
