const express=require('express');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const userinfo=require('./controllers/userinfo');
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',userinfo.userinfoHandler(knex));
app.post('/signin',signin.signinHandler(knex,bcrypt));
app.post('/register',register.registerHandler(knex,bcrypt));
app.get('/profile/:id',profile.profileHandler(knex));
app.put('/image',image.imageHandler(knex));
app.post('/imageurl',image.APICallHandler());

app.listen(process.env.PORT || 3000,()=>{
    console.log(`the app is running on ${process.env.PORT}!!!`);
})