function errorHandler(asyncController) {
    return async (req, res) => {
        try {
            await asyncController(req, res)
        }
        catch (err) {
            if (err.message === "KEY_ERROR")
                res.status(err.statusCode ? err.statusCode : 400).json({ message: err.message });
            else if (err.message === "INVALID_DATA_INPUT")
                res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
            else if (err.message === "USER_NOT_EXIST" || "INVALID_PASSWORD" || "USER_NOT_EXIST" || "INVALID_NAME" || "INVALID_BIRTH" || "INVALID_PHONE_NUMBER" || "INVALID_PASSWORD" || "INVALID_USER_ID" || "INVALID_EMAIL" || "DATA_EXIST" || "INVALID_INPUT")
                res.status(err.statusCode ? err.statusCode : 409).json({ message: err.message });
        }
    };
}

module.exports = errorHandler;