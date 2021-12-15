'use strict';

class WalletServiceDTO {
    constructor(object) {
        this.object = object;
        this.mapping = {
            apiVersion: 'apiVersion',
            requestId: 'requestId',
            data: 'data',
            context: 'context',
        };

        return this;
    }

    map() {
        const data = this.object;
        let result = {};
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'string' || (key === 'data' && typeof data[key] === 'object')) {
                if (this.mapping.hasOwnProperty(key)) {
                    result[this.mapping[key]] = data[key];
                }
            }
        });

        return result;
    }
}

module.exports = WalletServiceDTO