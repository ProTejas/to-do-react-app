const fs = require('fs');

function logReqRes(fileName) {
    return (req, res, next) => {
        const log = `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`;
        fs.appendFile(fileName, log, (err) => {
            if (err) {
                console.error('Error writing log:', err);
            }
            next();
        });
    };
}

module.exports = { logReqRes };
