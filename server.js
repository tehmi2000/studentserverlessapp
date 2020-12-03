// TO RUN THE EXPRESS SERVER LOCALLY
const { app } = require('./app');
const config = require('./configuration/appConfig'); 
const PORT = (process.env.PORT === undefined || process.env.PORT === null || process.env.PORT === '')? config.PORT : process.env.PORT;

app.listen(PORT, '0.0.0.0', function(){
    console.log('Server Started!');
    console.log(`Server is running on PORT:${PORT}`);
});