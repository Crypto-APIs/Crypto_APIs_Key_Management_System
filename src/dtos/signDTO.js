'use strict';

class SignDTO {

    /**
     * @param {Object} data
     * @returns {SignDTO}
     */
    constructor(data) {
        this.data = data;

        return this;
    }

    /**
     * @returns {string}
     */
    get id() {
        return this.data.id;
    }

    /**
     * @returns {string}
     */
    get raw() {
        return this.data.raw;
    }
}

module.exports = SignDTO;