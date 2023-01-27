const {Enumerations, Client, Services, Models} = require('./index');
const blockchain = Enumerations.Blockchains.DASH;
const network = Enumerations.Networks[blockchain].NETWORK_DASH_TESTNET;
const signService = new Services.SignService(blockchain, network)
const client = new Client('ca75ab4a773fd2ba608acd1a2d7c4b040351702b', blockchain, network);
const tpub = "tpubDCMwqEVks5AXkuHCXJaVZuzG2y9g3nPavsANUHVaXgziUbi8CSXq35KdDgepUrU2zjdC6NJVJmxnWgxvgQKU6b3YSKKA8a9dPNLcpUo9rFu"
const feeOptions = new Models.UTXOBasedFeeOptionsModel({
    prepareStrategy: Enumerations.PrepareStrategies.MINIMIZE_DUST,
    priority: Enumerations.FeePriorities.FAST,
});
const recipients = [
    new Models.RecipientModel("yWx6TAMi2buroLeBdVvz2EndrSdTSx7SWm", '0.000031')
];

(async () => {

    const preparedUTXOTransaction = await client.prepareUTXOBasedTransactionFromHDWallet({
        xPub: tpub,
        recipients: recipients,
        feeOptions,
    }).then((data) => {
        console.dir('API called successfully. Returned data:');
        console.dir(data);
        const accountXpriv = "tprv8ffugpTWihUrsSFQdeuuAWL9TwdjtTCgMZZbBmTH7RCKe7TMa3iErahm3b9kF2i7eE4w2ai34dseyTvZE9RKPqfr2qRKhArpfQbEyFrSG3Y"
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
