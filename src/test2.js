const {Enumerations, Client, Services } = require('./index')
const blockchain = Enumerations.Blockchains.BITCOIN;
const network = Enumerations.Networks[blockchain].NETWORK_BITCOIN_MAINNET;
const client = new Client('6b43f936de4c3af533def7ee3ecd830e9cc23fb2', blockchain, network);
const xPub = 'xpub6BsFsonVJR5vPChKQamp55R7veBCMD2CL3LtL83B3FS5DiayYgmoHCGQodeLTukaa4anZRQD9kNtPFHuPnCzjCiT9nrXdf3voNLhXQryBRB';

     client.syncNewHDWallet(xPub).then((data) => {
        console.dir('API called successfully. Returned data:');
        console.dir(data);
    }, (error) => {
        console.log(error);
    });
