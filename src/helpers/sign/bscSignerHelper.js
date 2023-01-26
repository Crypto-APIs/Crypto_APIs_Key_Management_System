'use strict';

const EthSignerHelper = require('./ethSignerHelper')
    , {Transaction: EthereumTx} = require("@ethereumjs/tx")
;

/**
 * BscSignerHelper
 *
 * @class BscSignerHelper
 *
 * @extends {EthSignerHelper}
 */
class BscSignerHelper extends EthSignerHelper {

    /**
     *
     * @inheritDoc
     */
    _buildTransaction(transaction) {
        let txData = {
            from: transaction.sender,
            to: transaction.recipient,
            value: transaction.amount,
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            nonce: transaction.nonce,
            data: transaction?.data?.data || transaction?.data,
        };

        return new EthereumTx(txData, this.networkConfig);
    }
}

module.exports = BscSignerHelper;