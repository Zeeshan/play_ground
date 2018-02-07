const router = require('express').Router();
const db = require('../db')

function loginRequired(req, res, next) {
  if(!req.isAuthenticated())
  {
    return res.redirect('/login')
  }
  next()
}

function AdminloginRequired(req, res, next)
{
  if(!req.user.is_admin)
  {
    res.render('403')
  }
  next()
}
router

//list loggedin user messages
.get("/mymessages/", loginRequired, (req, res, next) => {
  const {id} = req.params
      db("user_msg")
      .where("userID", req.user.id)
      .then( (msgs) =>
      {
          res.render("tweets" , {
          title: "Message from user " + req.user.name,
          msgs,
        })
      }, next)
    }
)

//list loggedin user messages
.get("/allmessages/", loginRequired, AdminloginRequired,  (req, res, next) => {
  const {id} = req.params
      db("user_msg")
      .where("userID", req.user.id)
      .then( (msgs) =>
      {
          res.render("tweets" , {
          title: "Message from user " + req.user.name,
          msgs,
        })
      }, next)
    }
)


//list user message by id
.get("/messages/:id/", (req, res, next) => {
  const {id} = req.params
      db("user_msg")
      .where("id", id)
        .then( (msgs) => {
        res.render("tweets" , {
          title: "Message from user " + id,
          msgs,
        })
      }, next)
    }
)
// list all messages
.get("/messages/", (req, res, next) => {
  const {id} = req.params;
      db("user_msg")
        .then( (msgs) => {
        res.render("tweets" , {
          title: "Message from all user " ,
          msgs,
        })
      }, next)
  }
)

//delete specific message
.delete("/messages/:id", (req, res, next) => {
  const {id} = req.params;
  db("user_msg")
    .where ("id", id)
    .delete()
    .then( (results) => {
      if(results === 0) {
        res.sendStatus(400)
      }
      res.sendStatus(200)
  }, next)
})


module.exports = router
