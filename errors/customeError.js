
const DEFAULT_STATUS_CODE = 500;

class CError extends Error {
    constructor(message, statusCode, msgList = null) {
        super(message);

        if (typeof statusCode !== 'number') statusCode = DEFAULT_STATUS_CODE;
        this.statusCode = statusCode;
        this.msgList = msgList;
    }

    getMessage() {
        return this.message;
    }

    getStatusCode() {
        return this.statusCode;
    }

    getMsgList() {
        return this.msgList;
    }
}

module.exports = CError;
module.exports.DEFAULT_STATUS_CODE = DEFAULT_STATUS_CODE;