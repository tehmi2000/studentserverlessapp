const model = () => {
	let configValues = {
    	host: "mystudentdb.csof68gm4mi1.us-east-1.rds.amazonaws.com",
    	port: 3306,
		user: process.env.MYSQL_USER,
    	password: process.env.MYSQL_PASS,
    	database: "mystudentdb"
	};
	
	// Use localConfigValues when testing and use a local MySQL database for testing
	let localConfigValues = {
    	host: "localhost",
    	port: 3306,
    	user: 'root',
    	password: '',
    	database: "mystudentdb"
	};

    return localConfigValues;
}

module.exports = model();