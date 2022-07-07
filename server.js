const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
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
console.log(db.select('*').from('users'))

const app = express();

app.use(bodyParser.json());

app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 2,
      joined: new Date()
    },
    {
      id: '128',
      name: 'Mimi',
      email: 'mimi@gmail.com',
      pasword: 'banana',
      entries: 5,
      joined: new Date()
    },
  ]
}

app.get('/', (req, res) => {
  res.send('Welcome')
  
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json(database.users[0]);

  }else {
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req, res) => {
  const {email, name } = req.body
  database.users.push({
    id: '126',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.status(200).json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id ===  id) {
      found = true
      return res.json(user)
    }
  })
  if(!found){
    res.status(400).json('User not found')
  }
})

app.put('/image',(req, res) => {
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id ===  id) {
      found = true
      user.entries++ 
      return res.json(user.entries)
    }
  })
  if(!found){
    res.status(400).json('User not found')
  }

})

app.listen(3001, ()=> {
  console.log('app is running on port 3000');
})