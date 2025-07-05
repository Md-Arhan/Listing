class ExpressError extends Error{
    constructor(statusCode, message) {
        super();    //use to call parent constructor
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;