const fs = require("fs");

async function RequestPathAndMethodLoggerMiddleware(req, res, next) {
    try {
        const { method, path } = req;

        const log = `Timestamp: ${new Date()} - ${path} - ${method}\n`;

        fs.appendFileSync("request.log.txt", log, "utf8");

        next();
    } catch (error) {
        console.log(error);
        res.status(error.status ? error.status : 500).json({
            success: false,
            message: error.status ? error.message : "Something went wrong",
        });
    }
}

module.exports = {
    RequestPathAndMethodLoggerMiddleware,
};
