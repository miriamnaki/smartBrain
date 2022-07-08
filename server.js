const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

// initiating database
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
app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if(user.length){
      res.json(user[0])
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err = res.status(400).json('user not found'))
})


// incrementing entries end point
app.put('/image',(req, res) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  })


  // app port
app.listen(3001, ()=> {
  console.log('app is running on port 3001');
})