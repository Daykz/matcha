var Connection   = require('../dbConnection');

const Login = {
	getUser({ login, password }){
		return Connection.query(`select users.password from users where login='${login}'`);
	}
};

module.exports = Login;