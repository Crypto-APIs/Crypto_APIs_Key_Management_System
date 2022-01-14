'use strict';

class BaseDTO {

    /**
     * @param {object} dataObj
     */
    constructor(dataObj) {
        this.data = dataObj;
    }

    /**
     * @returns {string}
     */
    getApiVersion() {
        return this.data.apiVersion;
    }

    /**
     * @returns {string}
     */
    getRequestId() {
        return this.data.requestId;
    }

    /**
     * @returns {string}
     */
    getData() {
        return this.data.data;
    }

    /**
     * @returns {string}
     */
    getItem() {
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
            if (typeof data[key] === 'string' || key === 'data' && typeof this.data[key] === 'object') {
                if (mapping.hasOwnProperty(key)) {
                    result[mapping[key]] = this.data[key];
                }
            }
        });

        return result;
    }
}

module.exports = BaseDTO;
