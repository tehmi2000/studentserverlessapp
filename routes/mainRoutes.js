const model = function() {
    const router = require("express").Router();
    const path = require('path');
    const { connectToDB, log } = require("../configuration/appConfig");

    const formatName = function(str){
        if(str === null || str === undefined) return null;
        let formattedString = (str.charAt(0)).toUpperCase()+(str.substring(1)).toLowerCase();
        return formattedString;
    };

    const genHex = function(length){
        length = length || 16;
        let counter = 0;
        let generated_hex = "t";
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        while(counter <= length){
            let rand_index = Math.round((Math.random()*characters.length)+1);
            generated_hex += characters.charAt(rand_index);
            counter += 1;
        }
        return generated_hex;
    };

// <<<<<<<<<<<<<<<<<<<<<<<<<<<< ROUTES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    router.get("/", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestDescription: 'API Documentation Home Page'
        };

        log(null, options);
        res.status(200).redirect("./index.html");
    });

    router.get("/docs", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestDescription: 'Full API Documentation'
        };

        log(null, options);
        
        res.status(200).redirect("./documentation/index.html");
    });
    

    // STUDENT API STARTS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    router.get("/student", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestDescription: `${(req.query)? req.query.limit : 'All'} Student Data`
        };

        log(null, options);

        // RETRIEVE STUDENT DATA FROM DATABASE
        let limit = req.query.limit;
        let mySQLquery = `SELECT uuid, firstname, lastname, email, phone FROM student ${(limit && limit > 0)? 'LIMIT ' + limit : ''}`;
        
        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    message: result
                });
            }
        });
    });
    
    router.post("/student/create", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestMethod: 'POST',
            requestDescription: 'Create Student Data'
        };

        log(null, options);

        // INSERT STUDENT DATA INTO DATABASE
        let userData = req.body;
        let mySQLquery = `INSERT INTO student (uuid, firstname, lastname, email, phone) VALUES ('${genHex(16)}','${formatName(userData.firstname) || 'John'}', '${formatName(userData.lastname) || 'Doe'}', '${userData.email || 'example@email.com'}', '${userData.phone || '+1234567890'}')`;

        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    message: result
                });
            }
        });
    });

    router.post("/student/create", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestMethod: 'POST',
            requestDescription: 'Create Student Data'
        };

        log(null, options);

        // INSERT STUDENT DATA INTO DATABASE
        let userData = req.body;
        let mySQLquery = `INSERT INTO student (uuid, firstname, lastname, email, phone) VALUES ('${genHex(16)}','${formatName(userData.firstname) || 'John'}', '${formatName(userData.lastname) || 'Doe'}', '${userData.email || 'example@email.com'}', '${userData.phone || '+1234567890'}')`;

        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    message: result
                });
            }
        });
    });

    router.delete("/student/delete/:id", (req, res) => {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestMethod: 'DELETE',
            requestDescription: `Student: ${req.params.id}`
        };

        log(null, options);
        
        // DELETE STUDENT DATA FROM DATABASE
        let studentId = req.params.id;
        let mySQLquery = `DELETE FROM student WHERE uuid= '${studentId}'`;

        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    message: result
                });
            }
        });
    });
    
    return router;
};

module.exports = model();