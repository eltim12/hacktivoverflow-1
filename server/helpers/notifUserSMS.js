const User = require('../models/user')
const send = require('./nexmo')

function notifUser(userId) {
    User
        .findById(userId)
        .then(found => {
            send(`${found.name} asked a new question`)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = notifUser