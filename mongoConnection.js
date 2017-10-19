const MongoClient = require('mongodb');

let mongoConnect = MongoClient.connect('localhost:27017', function(err, db) {
  if (err) {
    throw err;
  }
  else
  	console.log('connection mongo success');
});
 module.exports = mongoConnect;