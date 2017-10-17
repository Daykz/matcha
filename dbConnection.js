var mysql    = require('promise-mysql');
// var Bear     = require('./models/bear');

var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'expressdb'
});
try {
	// connection.connect();
	console.log('Database Connection Success');
	
} catch(e) {
	console.log('Database Connection failed:' + e);
};

module.exports = connection;