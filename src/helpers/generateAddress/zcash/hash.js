'use strict';

const crypto = require('crypto');

const Hash = module.exports;

Hash.sha256 = function(buf) {
    return crypto.createHash('sha256').update(buf).digest();
};

Hash.ripemd160 = function(buf) {
    return crypto.createHash('ripemd160').update(buf).digest();
};

Hash.sha256ripemd160 = function(buf) {
    return Hash.ripemd160(Hash.sha256(buf));
};

Hash.sha256sha256 = function(buf) {
    return Hash.sha256(Hash.sha256(buf));
};
