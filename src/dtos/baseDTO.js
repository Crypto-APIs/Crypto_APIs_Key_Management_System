'use strict';

class BaseDTO {

    /**
     * @param {object} object
     */
    constructor(object) {
        this.object = object;

        this.mapping = {
            apiVersion: 'apiVersion',
            requestId: 'requestId',
            data: 'data',
            context: 'context',
        };
    }

    /**
     * @returns {string}
     */
    getApiVersion() {
        return this.object.apiVersion;
    }

    /**
     * @returns {string}
     */
    getRequestId() {
        return this.object.requestId;
    }

    /**
     * @returns {string}
     */
    getData() {
        return this.object.data;
    }

    /**
     * @returns {string}
     */
    getItem() {
        return this.object.data.item;
    }

    serialize() {
        const data = this.object;
        let result = {};
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'string' || key === 'data' && typeof data[key] === 'object') {
                if (this.mapping.hasOwnProperty(key)) {
                    result[this.mapping[key]] = data[key];
                }
            }
        });

        return result;
    }
}

module.exports = BaseDTO;
