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
            requestDescription: `${(req.query && req.query.limit)? req.query.limit : 'All'} Student Data`
        };

        log(null, options);

        // RETRIEVE STUDENT DATA FROM DATABASE
        let limit = req.query.limit;
        let mySQLquery = `SELECT uuid, firstname, lastname, email, phone FROM student ${(limit && limit > 0)? 'LIMIT ' + limit : ''}`;
        
        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error connecting to MySQL'});
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
        let uuid = `${genHex(16)}`;
        let mySQLquery = `INSERT INTO student (uuid, firstname, lastname, email, phone) VALUES ('${uuid}','${formatName(userData.firstname) || 'John'}', '${formatName(userData.lastname) || 'Doe'}', '${userData.email || 'example@email.com'}', '${userData.phone || '+1234567890'}')`;

        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error connecting to MySQL'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    message: 'Student record created',
                    createdId: uuid
                });
            }
        });
    });

    router.post("/student/update/:id", function(req, res) {
        // LOG DETAILS ABOUT REQUEST MADE TO THIS ENDPOINT
        let options = {
            request: req,
            requestMethod: 'POST',
            requestDescription: 'Update Student Data'
        };

        log(null, options);

        let userData = req.body;

        let buildQuery = function(data){
            let sqlquery = '';
            let columnList = Object.keys(data);
            let valueList = [];

            // Assign the values of the data into the 'valueList' array...
            columnList.forEach(columnName => {
                valueList.push(data[columnName]);
            });

            // Map each value to the form >>> '<column name> = <column value>'
            valueList = valueList.map((columnValue, index) => {
                return `${columnList[index]}='${columnValue}'`;
            });

            sqlquery = `UPDATE student SET ${valueList.join(', ')} WHERE uuid='${req.params.id}'`;
            return sqlquery;
        };

        // CREATE MYSQL QUERY FROM DATA
        let mySQLquery = buildQuery(userData);

        // UPDATE STUDENT DATA IN DATABASE
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error connecting to MySQL'});
                res.status(500).json({err});

            }else if(result){
                // RETURN RESULT
                res.status(200).json({
                    statusCode: 200,
                    message: 'Student Record Updated Successfully',
                    updatedId: `${req.params.id}`
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
        let mySQLquery = `DELETE FROM student WHERE uuid='${studentId}'`;

        // RUN MYSQL QUERY
        connectToDB().query(mySQLquery, (err, result) => {
            if (err) {
                // LOG ERROR AND RETURN ERROR
                log(err, {...options, logType: 'ERROR', requestDescription: 'Error connecting to MySQL'});
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