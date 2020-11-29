"use strict";
// VARIABLE ASSIGNMENTS
const serverless = require('serverless-http');
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

// APPLICATION SETUP
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

// ERROR HANDLING
// app.use('*', (req, res, next) => {
//     res.send("<p>404 Error: Webpage could not be found</p>");
//     next();
// });

// APPLICATION ROUTING
app.use('/', require("./routes/mainRoutes"));

// EXPORT HANDLER TO USE IN SERVERLESS.YML
module.exports.handler = serverless(app);