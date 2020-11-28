const model = () => {
    return {
    	host: "mystudentdb.csof68gm4mi1.us-east-1.rds.amazonaws.com",
    	port: 3306,
    	user: process.env.MYSQL_USER,
    	password: process.env.MYSQL_PASS,
    	database: "mystudentdb"
    }
}

module.exports = model();