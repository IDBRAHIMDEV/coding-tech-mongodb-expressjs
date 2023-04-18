
exports.handlerError = (err, req, res, next) => {

    if(err.name === "FileError") {
        return res.status(400).json({
            success: false,
            message: "File not authorized"
        })
    }

    if(err.name === "UnauthorizedError") {
        return res.status(401).json({
            success: false,
            message: "Resource not authorized"
        })
    }

    if(err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Bad request, invalidate data"
        })
    }

    res.status(500).json({
        success: false,
        err
    })

}