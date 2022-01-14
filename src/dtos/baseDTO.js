'use strict';

class BaseDTO {
    data;

    /**
     * @param {object} dataObj
     */
    constructor(dataObj) {
        this.data = dataObj;

        return this;
    }

    /**
     * @returns {string}
     */
    get apiVersion() {
        return this.data.apiVersion;
    }

    /**
     * @returns {string}
     */
    get requestId() {
        return this.data.requestId;
    }

    /**
     * @returns {string}
     */
    get data() {
        return this.data.data;
    }

    /**
     * @returns {string}
     */
    get item() {
        return this.data.data.item;
    }

    /**
     * @returns {object}
     */
    serialize() {
        const result = {};
        const mapping = {
            apiVersion: 'apiVersion',
            requestId: 'requestId',
            data: 'data',
            context: 'context',
        };

        Object.keys(this.data).forEach((key) => {
            if (typeof this.data[key] === 'string' || key === 'data' && typeof this.data[key] === 'object') {
                if (mapping.hasOwnProperty(key)) {
                    result[mapping[key]] = this.data[key];
                }
            }
        });

        return result;
    }
}

module.exports = BaseDTO;
