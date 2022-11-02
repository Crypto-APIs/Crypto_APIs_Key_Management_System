'use strict';

const EthSignerHelper = require('./ethSignerHelper')
    , EthereumTx = require('@ethereumjs/tx').Transaction
;


/**
 * EtcSignerHelper
 *
 * @class EtcSignerHelper
 *
 * @extends {EthSignerHelper}
 */
class EtcSignerHelper extends EthSignerHelper {

    /**
     *
     * @inheritDoc
     */
    _buildTransaction(transaction) {
        let txData = {
            from: transaction?.sender,
            to: transaction?.recipient,
            value: transaction?.amount,
            gasPrice: transaction?.gasPrice,
            gasLimit: transaction?.gasLimit,
            nonce: transaction?.nonce,
            data: transaction?.data?.data,
        };

        return new EthereumTx(txData, this.networkConfig);
    }
}

module.exports = EtcSignerHelper;