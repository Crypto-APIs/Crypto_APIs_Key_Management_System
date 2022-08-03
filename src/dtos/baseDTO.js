'use strict';

class BaseDTO {
    /**
     * @param {Object} dataObj
     */
    constructor(dataObj) {
        this._data = dataObj;

        return this;
    }

    /**
     * @returns {string}
     */
    get apiVersion() {
        return this._data.apiVersion;
    }

    /**
     * @returns {string}
     */
    get requestId() {
        return this._data.requestId;
    }

    /**
     * @returns {Object}
     */
    get data() {
        return this._data.data;
    }

    /**
     * @returns {Object}
     */
    get item() {
        return this.data.item;
    }

    /**
     * @returns {Object}
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
