'use strict';

const BaseDTO = require('./baseDTO');

class ListDTO extends BaseDTO {

    /**
     * @param {Object} object
     * @returns {ListDTO}
     */
    constructor(object) {
        super(object);

        return this;
    }

    /**
     * @returns {Array}
     */
    get addresses() {
        return this.data.items;
    }
}

module.exports = ListDTO;