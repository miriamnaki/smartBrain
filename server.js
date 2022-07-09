const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// connecting ot the database
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    // port : 3306,
    user : 'miriamnaki',
    password : '',
    database : 'smart-brain'
  }
});


const app = express();

// using middlewarre
app.use(bodyParser.json());

app.use(cors());

// root endpoint
app.get('/', (req, res) => {
  res.send('Welcome') 
})

// register end point
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

// signin end point
app.post('/signin', (req, res)  => signin.handleSignin(req, res, db, bcrypt))

// user profile end point
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));


// incrementing entries end point
app.put('/image', (req, res) => image.handleImagePost(req, res, db));

app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

  // app port
app.listen(3001, ()=> {
  console.log('app is running on port 3001');
})