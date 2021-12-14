'use strict';

const validateCallback = require('../validators/validateCallback');

class ProcessCallbacksService {
    response;

    /**
     * @param key
     * @returns {boolean|string}
     */
    getValue(key) {
        if (this.response.hasOwnProperty(key)) return this.response[key];

        let seen = new Set, active = [this.response], found = false;
        while (active.length) {
            let newActive = [];
            for (let i=0; i<active.length; i++) {
                Object.keys(active[i]).forEach(function(k){
                    let x = active[i][k];
                    if (k === key) {
                        found = x;
                    } else if (x && typeof x === "object" &&
                        !seen.has(x)) {
                        seen.add(x);
                        newActive.push(x);
                    }
                });
            }
            if (found !== false) break;
            active = newActive;
        }

        return found;
    }

    /**
     * @param {object} response
     * @returns {*}
     */
    callbackSubscribedEvents(response) {
        validateCallback.init(response);

        this.response = response;

        return this;
    }

    /**
     * @param {object} response
     * @returns {*}
     */
    broadcastedTransactionCallback(response) {
        validateCallback.init(response);

        return response;
    }
}

module.exports = ProcessCallbacksService;