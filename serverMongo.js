// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const cors	   = require('cors');
// const Task	   = require('./models/taskMySQL');
// const	Signin		= require('./models/inscription');
// const	Login		= require('./models/connexion');
const MongoClient	= require('mongodb');
const bcrypt 		= require('bcrypt-nodejs');
const jwt			= require('jsonwebtoken');
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

const api = () => {
  const sousapp = express();

  sousapp.get('/', (req, res, next) => {
			res.json({ message: 'hooray! welcome to our api!' });
		    })
	     // .use('/bears', useBears())
	     .use('/signin', useSignin())
	     .use('/login', useLogin());
	     // .use('/task', useTask());
    // .post('/bears', postBear())
    // .put('/bears/:id', putBear())
    // .delete('/bears/:id', deleteBear());
  return sousapp;
};

const useLogin = () => {
	const Router = express.Router();
	Router.get('/', (req, res, next) => {
			console.log(req.query.password);
			Login.getUser(req.query)
			  .then((hash) => bcrypt.compare(req.query.password, hash[0]['password']))
			  .then((result) => {
			  	console.log('result = ',result);
			  	if (result)
			  		res.json('Password match');
				else
					res.json('Password dont match');
			  })
			  .catch(err => res.json({'erreur = ': err}));
	});
	return Router;
};

const useSignin = () => {
	const Router = express.Router();

	Router.post('/', (req, res, next) => {
				console.log(req.body);
				db.collection('users').save(req.body)
				.then(() => res.json('Successfully Signed'))
				.catch(err => res.json(err));
				})
		  .get('/:id?', (req, res, next) => {
		  		if (req.params.id)
		  			Signin.getUser(req.params.id).then(rows => res.json(rows)).catch(err => res.json(err));
		  		else
		  			Signin.getAllUsers().then(rows => res.json(rows)).catch(err => res.json(err));
		  	});
	return Router;
};

const useTask = () => {
	const Router = express.Router();

	Router.get('/:id?', (req, res, next) => {
				if (req.params.id)
					Task.getTaskById(req.params.id).then(rows => res.json(rows)).catch(err => res.json(err));
			    else
			    	Task.getAllTasks().then(rows => res.json(rows)).catch(err => res.json(err));
			})
	   		.post('/', (req, res, next) => {
		   		Task.addTask(req.body).then(() => res.json(req.body)).catch(err => res.json(err));
		    })
		    .delete('/:id', (req, res, next) => {
		   		console.log('delete');
		   		Task.deleteTask(req.params.id).then(() => res.json(req.params.id)).catch(err => res.json(err));
		    })
		    .put('/:id', (req, res, next) => {
		   		Task.updateTask(req.params.id, req.body).then(rows => res.json(rows)).catch(err => res.json(err));
		    })
   return Router;
};


// const useBears = () => {
//    const Router = express.Router();

//    Router
//      .get('/', (req, res) => {
//        Bear.find().then(bears => res.json(bears)).catch(err => res.send(err));
// 	 })
//      .post('/', postBear())
//      .get('/:id', getBear())
//      .put('/:id', putBear())
//      .delete('/:id', deleteBear());
//  return Router;
// };

// const postBear = () => {
//    const Router = express.Router();

//   Router.post('/', (req, res) => {
// 	        const bear = new Bear();      // create a new instance of the Bear model
// 	        bear.name = req.body.name;  // set the bears name (comes from the request)

// 	        // save the bear and check for errors
// 	        bear.save().then(() => res.json({ message: 'Bear created!' })).catch(err => res.send(err));
// 	    });
//  return Router;
// };

// const getBear = () => {
// 	const Router = express.Router();

// 	Router.get('/', (req, res) => {
// 	        Bear.findById(req.params.id).then(bear => res.json(bear)).catch(err => res.send(err))
// 	      })
//  return Router;
// };

// const putBear = () => {
// 	const Router = express.Router();

// 	Router.put('/:id', (req, res) => {
// 	        // use our bear model to find the bear we want
// 	        Bear.findById(req.params.id).then(bear => {
// 	        	name = bear.name;
// 	            bear.name = req.body.name;  // update the bears info

// 	            // save the bear
// 	            	bear.save(res.json({ message: 'Bear '+name+' updated to '+req.body.name+'!' }));
// 	            }).catch(err => res.send(err));
//     		})
//  return Router;
// };

// const deleteBear = () => {
// 	const Router = express.Router();

// 	Router.delete('/:id', (req, res) => {
// 	    	Bear.remove({_id : req.params.id}).then(bear => res.json({message: 'Successfully deleted'})).catch(err => res.send(err))
// 	    });
//  return Router;
// };



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(cors())
 //   .use((req, res, next) => {
 //   	  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
 //   	  	jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs')
 //   	  	  .then((decode) => {
 //   	  		req.user = decode;
 //   	  		next();
 //   	  	  })
 //   	  	  .catch(err => req.user = undefined);
 //   	  }
 //  	  else {
 //  	  	console.log('api');
 //  	  	req.user = undefined;
 //  	  	// next();
 //  	}
 //  	  api();
	// })
   .use('/api', api());



////// mongoose connection ////////
// const mongoose = require('mongoose'); 
// // Ces options sont recommandées par mLab pour une connexion à la base
// const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
// replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
 
// //URL de notre base
// const urlmongo = "mongodb://localhost:27017"; 
 
// // Nous connectons l'API à notre base de données
// mongoose.connect(urlmongo, options);
 
// const db = mongoose.connection; 
// db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
// db.once('open', () => console.log("Connexion à la base OK"));


// const port = process.env.PORT || 8081;        // set our port

// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);
//


