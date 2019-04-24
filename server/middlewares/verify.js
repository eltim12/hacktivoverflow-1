const color = require('colors')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const token = require('../helpers/token')

module.exports = {

    authenticate: function (req, res, next) {
        console.log('authenticating...'.red)
        try {
            const tokenCheck = token.verify(req.headers.token)
            req.authenticated = tokenCheck
            console.log('user authenticated!'.green.bold)
            next()
        } catch (err) {
            res.status(401).json({
                msg: 'user not authenticated'
            })
        }
    },

    authorizeUser: function (req, res, next) {
        console.log('authorizing...'.red)
        User
            .findById(req.params.id)
            .then(found => {
                if (found._id.toString() === req.authenticated.userId.toString()) {
                    console.log('user authorized!'.green.bold)
                    next()
                } else {
                    res.status(401).json({
                        msg: 'not allowed!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    authorizeQuestion: function (req, res, next) {
        console.log('authorizing...'.red)
        Question
            .findById(req.params.id)
            .then(found => {
                if (found.userId.toString() === req.authenticated.userId.toString()) {
                    console.log('user authorized!'.green.bold)
                    next()
                } else {
                    res.status(401).json({
                        msg: 'not allowed!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    authorizeAnswer: function (req, res, next) {
        console.log('authorizing...'.red)
        Answer
            .findById(req.params.id)
            .then(found => {
                if (found.userId.toString() === req.authenticated.userId.toString()) {
                    console.log('user authorized!'.green.bold)
                    next()
                } else {
                    res.status(401).json({
                        msg: 'not allowed!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
}   