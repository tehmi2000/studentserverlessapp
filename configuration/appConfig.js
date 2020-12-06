
const model = function() {
    const fs = require('fs');
    const dbConfig = require('./dbConfig');
    const mysql = require("mysql");
    const mySqlConnection = mysql.createConnection(dbConfig);
    
    const PORT = 51000;
    const log = function(logContent, options) {
        // LOG DISPLAY CONFIGS
        let defaultOption = {
            request: {
                IP: null,
                url: null,
                headers: {},
                body: null
            },
            requestMethod: 'GET',
            requestDescription: 'No description for this request',
            logToConsole: true,
            logType: 'INFO'
        };

        // UPDATE DEFAULT CONFIG WITH USERS CONFIG
        options = (options)? Object.assign(defaultOption, options) : defaultOption;

        // JSON CONTENT TO LOG
        let timestamp = new Date().toUTCString();
        let requestLog = {
            logType: options.logType,
            IP: options.request.IP,
            url: options.request.url,
            application: options.request.headers['user-agent'],
            data: {
                action: `[${options.requestMethod}]: ${options.requestDescription}`,
                body: options.request.body,
                log: logContent
            }
        };

		let content = `${timestamp}  [${options.logType.toUpperCase()}]: ${JSON.stringify(requestLog, null, 4)}\n`;
		fs.appendFile("./stderr.log", content, function(err) {
			if(err) console.error(err);
		});
        
        // if(options.logToConsole === true && logContent !== null) console.error(logContent.message);
    };

    let connectToDB = function (shouldLogError) {
        shouldLogError = shouldLogError || true;
        mySqlConnection.connect(err => {
            if (err) {
                log(err, {logToConsole: shouldLogError});
                return;
            }
            console.info("Connection to MySQL database was successful!");
        });
        
        return mySqlConnection;
    }

    return { connectToDB, log, PORT };
}

module.exports = model();