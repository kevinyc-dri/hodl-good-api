const User = require('../models/UserModel')

exports.getAllUsers = (req, res) => {
  User.find()
    .then(allUsers => res.status(200).json(allUsers))
    .catch(err => res.status)
}

exports.signup = (req, res) => {
  const { email, uid } = req.body
  const user = new User({ email, uid})

  user
    .save()
    .then(() => {
      res.status(200).send('user was added')
    })
    .catch(err => console.log(err))
}