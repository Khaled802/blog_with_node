

module.exports.wrapIt = async (func) => {
    try {
        return await func();
    } catch(err) {
        if (err.statusCode === undefined) {
            throw new CError(ReasonPhrases.INTERNAL_SERVER_ERROR);
        }
        throw err;
    }
}