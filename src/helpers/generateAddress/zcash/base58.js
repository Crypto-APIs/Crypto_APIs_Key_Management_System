'use strict';

const bs58 = require('bs58');
const Hash = require('./hash');

const encode = function(buf) {
    let checkedBuf = Buffer.alloc(buf.length + 4);
    let hash = Hash.sha256sha256(buf).slice(0, 4);
    buf.copy(checkedBuf);
    hash.copy(checkedBuf, buf.length);
    return bs58.encode(checkedBuf);
};

module.exports = {
    encode
};
