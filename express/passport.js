const bcrypt = require('bcrypt-nodejs');
const knex = require("knex")
const LocalStartegy = require("passport-local").Strategy
const passport = require("passport")

const db = require('./db')

passport.use(new LocalStartegy(authenticate))
passport.use('local-signup', new LocalStartegy({passReqToCallback: true}, register))

function register(req, email, password, done) {
    db("users")
      .where("email", email)
      .first()
      .then((user)=>{
        if(user)
        {
          return done(null, false, {message: 'Email Exist'})
        }
        else
        {
          if(req.body.name == '' || req.body.age=='' )
          {
            return done(null, false, {message: 'Enter data'})
          }
          if(password !== req.body.password2 )
          {
            return done(null, false, {message: 'Password dont match'})
          }
        }
        const newUser = {
          name : req.body.name,
          age: req.body.age,
          email: email,
          password: bcrypt.hashSync(password),
        }
        db("users")
        .insert(newUser)
        .then((ids)=>{
          newUser.id = ids[0]
          done(null, newUser)
        })
        //loop???
      }, done)
}

function authenticate(email, password, done) {
    db("users")
      .where("email", email)
      .first()
      .then((user)=>{
        if (!user) {
          return done(null, false, {message: 'user dont exist'})
        }
        if(bcrypt.compareSync('password', user.password) ) {
          return done(null, false, {message: 'password dont match'})
        }
        //Unhandled rejection Not a valid BCrypt hash All errors
        done(null, user)
      }, done)
}

passport.serializeUser(function(user,done){
  done(null,user.id)
} )

passport.deserializeUser(function(id,done){
  db("users")
  .where("id",id)
  .first()
  .then( (user)=> {
    done(null, user )
  }, done)
} )
