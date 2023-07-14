const sendErrorDev = (err, res) => {
    console.log(err.message, err.status)
    res.status(err.statusCode).send({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        res.status(500).send({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // logging error regardless of the env if headers sent
    if (res.headersSent) {
        console.log("---headers-sent---");
        console.log(err.stack);
    };
    // configuring error handling based on env
    if (process.env.NODE_ENV === 'production') {
        !res.headersSent && sendErrorProd(err, res);
    } else {
        !res.headersSent && sendErrorDev(err, res);
    }
};