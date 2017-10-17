var Connection   = require('../dbConnection');

var Signin = {
	addUser(Signin){
		return Connection.query('insert into users (login,password) values(?,?)', [Signin.login, Signin.password]);
	},
	getUser(id){
		return Connection.query('select * from users where id = ?', id);
	},
	getAllUsers(){
		return Connection.query('select * from users');
	}
};

module.exports = Signin;