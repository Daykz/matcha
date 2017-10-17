var Connection   = require('../dbConnection');

var Task={
 
getAllTasks(){
 
return Connection.query("Select * from task");
},
getTaskById(id){
 
return Connection.query("select * from task where Id=?",id);
 },
addTask(Task){
 return Connection.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status]);
 },
deleteTask(id){
  return Connection.query("delete from task where Id=?",id);
 },
updateTask(id,Task){
  return Connection.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id]);
 }
 
};
// var Users={
// 	createUser(){
// 		return Connection.query('insert into users values()')
// 	}
// };

 module.exports=Task;