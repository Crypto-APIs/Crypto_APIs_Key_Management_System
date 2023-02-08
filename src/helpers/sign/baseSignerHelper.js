'use strict';

const NetworksConfigsEnum = require('../../enumerations/networkEnum');
const {BaseBlockchainAwareService} = require("../../services/baseServices");
const b58 = require('bs58check');
const HDKey = require("hdkey");
const XPRIV_VERSION = "0488ade4";

/**
 * BaseSignerHelper
 *
 * @class BaseSignerHelper
 * @extends {BaseBlockchainAwareService}
 */
class BaseSignerHelper extends BaseBlockchainAwareService {
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
     * @param {string} xPriv account extended xPriv
     * @param {TransactionDTO} transaction
     * @protected
     * @return {{id: string, raw: string}}
     */
    sign({xPriv, transaction}) {
        throw new Error('Implement sign method for service ' + this.constructor.name);
    };

    /**
     * @param {string} extendedPrivateKey
     * @return {HDKey}
     * @protected
     */
    _createHDKey(extendedPrivateKey) {
        console.log(extendedPrivateKey)
        const data = b58.decode(extendedPrivateKey);
        const xPrivData = Buffer.concat([Buffer.from(XPRIV_VERSION, 'hex'), data.slice(4)]);
        const xPriv = b58.encode(xPrivData);

        console.log(xPriv)

        return HDKey.fromExtendedKey(xPriv)
    }

}

module.exports = BaseSignerHelper;