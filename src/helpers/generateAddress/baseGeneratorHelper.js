'use strict';

const NetworksConfigsEnum = require('../../enumerations/networkEnum')
    , {BaseBlockchainAwareService} = require("../../services/baseServices")
    , HDKey = require('hdkey')
    , WalletService = require("../../services/walletService")
    , AddressDTO = require("../../dtos/addressDTO")
;


/**
 * BaseGeneratorHelper
 *
 * @class BaseGeneratorHelper
 * @extends {BaseBlockchainAwareService}
 */
class BaseGeneratorHelper extends BaseBlockchainAwareService {
    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor({blockchain, network}) {
        super(blockchain, network)

        if (!NetworksConfigsEnum.NETWORKS_CONFIGS.hasOwnProperty(this.blockchain)
            || !Object.keys(NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain].hasOwnProperty(this.network))) {
            throw new Error('Unknown configuration for ' + this.blockchain + ':' + this.network);
        }

        this.networkConfig = NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain][this.network];
    }

    /**
     *
     * @return {AddressDTO}
     */
    async deriveXpubAddress() {

        const wallet = await this._generateXpub();

        const xPub = wallet.accountXpub;
        let hdKey = HDKey.fromExtendedKey(xPub);
        const path = `m/0/0`;
        let childKey = hdKey.derive(path);
        const publicKey = childKey.publicKey.toString('hex');
        const address = this.generateAddressFromPublicKey({publicKey});

        const xPriv = wallet.accountXpriv;
        hdKey = HDKey.fromExtendedKey(xPriv, this.networkConfig?.bip32);
        const derivedPrivKey = hdKey.derive(path)
        const privateKey = derivedPrivKey.privateKey.toString('hex');

        return new AddressDTO({
            address,
            privateKey,
            publicKey,
        });
    }

    /**
     *
     * @returns {Object}
     * @private
     */
    async _generateXpub(){
        const walletService = new WalletService(this.blockchain, this.network);
        const wallet = await walletService.createHDWallet();

        return wallet.xPub;
    }

    /**
     * @param {string} publicKey
     *
     * @returns {string}
     */
    generateAddressFromPublicKey({publicKey}) {
        throw new Error('Implement generateAddressFromPublicKey method for service ' + this.constructor.name);
    }
}

module.exports = BaseGeneratorHelper;