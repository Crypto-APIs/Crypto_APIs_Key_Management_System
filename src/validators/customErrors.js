'use strict';

const ERRORS = {
    "API_KEY_NOT_FOUND": {
        httpCode: 404,
        message: 'Please provide API KEY'
    },
    'BLOCKCHAIN_NOT_FOUND': {
        httpCode: 404,
        message: 'Please provide blockchain'
    },
    'INVALID_BLOCKCHAIN': {
        httpCode: 400,
        message: 'Please provide one of the following values: {blockchains}'
    },
    'NETWORK_NOT_FOUND': {
        httpCode: 404,
        message: 'Please provide network'
    },
    'INVALID_NETWORK': {
        httpCode: 400,
        message: 'Please provide one of the following values: {networks}'
    },
    'INVALID_CALLBACK': {
        httpCode: 400,
        message: 'Please provide valid callback object'
    },
    'UNEXPECTED_ERROR': {
        httpCode: 404,
        message: 'Unexpected error occurred!'
    }
}

/**
 * @param {string} code
 * @param {string|null} placeholders
 * @returns {{httpCode: number, message: string}|*}
 */
module.exports.getErrorMessage = function (code, placeholders = null) {
    if (ERRORS.hasOwnProperty(code.toUpperCase()) === false) {
        return ERRORS['UNEXPECTED_ERROR'];
    }
    code = code.toUpperCase();
    const result = {};
    const message = ERRORS[code].message;

    if (placeholders !== null) {
        Object.keys(placeholders).forEach(function(k) {
            result.message = message.replace('{'+k+'}', placeholders[k]);
            result.code = ERRORS[code].httpCode;
        });
    }

    return result;
}