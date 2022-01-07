'use strict';

const ERRORS = {
    "API_KEY_NOT_FOUND": {
        httpCode: 404,
        message: 'ERROR: please provide API KEY'
    },
    'BLOCKCHAIN_NOT_FOUND': {
        httpCode: 404,
        message: 'ERROR: please provide blockchain'
    },
    'INVALID_BLOCKCHAIN': {
        httpCode: 400,
        message: 'ERROR: please provide one of the following values: {blockchains}'
    },
    'NETWORK_NOT_FOUND': {
        httpCode: 404,
        message: 'ERROR: please provide network'
    },
    'INVALID_NETWORK': {
        httpCode: 400,
        message: 'ERROR: please provide one of the following values: {networks}'
    },
    'INVALID_CALLBACK': {
        httpCode: 400,
        message: 'ERROR: please provide valid callback object'
    },
    'UNEXPECTED_ERROR': {
        httpCode: 404,
        message: 'unexpected error occurred!'
    }
}

module.exports.getErrorMessage = function (code, placeholders = null) {
    if (ERRORS.hasOwnProperty(code.toUpperCase()) === false) {
        return ERRORS['UNEXPECTED_ERROR'];
    }

    let message = ERRORS[code.toUpperCase()].message;

    if (placeholders !== null) {
        Object.keys(placeholders).forEach(function(k){
            message = message.replace('{'+k+'}', placeholders[k]);
        });
    }

    return message;
}