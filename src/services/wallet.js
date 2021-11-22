"use strict";

const bip39 = require('bip39')
    , fs = require('fs')
    , validateBlockchain = require("../validators/blockchain")
    , {XPUB_DERIVATION_TYPES: XpubDerivationTypesEnum} = require('../helpers/xpubFormats')
;

const DEFAULT_WORDS_COUNT = 12;
const MNEMONIC_STRENGTH_MULTIPLIER = 16;
const WALLET_FILE = "wallet.dat";

class Wallet {

    /**
     * @param {string} chain
     * @param {string} network
     * @returns {Promise<{seed: string, blockchain: string, xpubsList: *[], mnemonic: string, network}>}
     */
    async createWallet(chain, network) {
        const blockchain = chain.toUpperCase();
        const walletPath = process.env.WALLET_PATH;

        const blockchainValidationResult = validateBlockchain(blockchain);
        if (blockchainValidationResult !== true) {
            console.log(blockchainValidationResult);
            return false;
        }

        const strength = (DEFAULT_WORDS_COUNT / 1.5) * MNEMONIC_STRENGTH_MULTIPLIER;
        const mnemonic = bip39.generateMnemonic(strength);
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const xpubDerivationTypes = XpubDerivationTypesEnum[chain];

        let xpubList = [];
        for (let derivationType of Object.keys(xpubDerivationTypes)) {
            xpubList.push(xpubDerivationTypes[derivationType](seed, network));
        }

        let data = {
            blockchain: blockchain,
            network: network,
            mnemonic: mnemonic,
            seed: seed.toString('hex'),
            xpubsList: xpubList
        };

        console.info(data);

        fs.writeFile(walletPath + WALLET_FILE, data.seed, function (err) {
            if (err) throw err;
        });

        return data;
    }
}

module.exports = Wallet;