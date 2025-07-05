module.exports = function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next); // ✅ This passes the error to Express error handler
    }
}