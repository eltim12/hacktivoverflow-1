const Question = require('../models/question')
const TagGenerator = require('../helpers/tagGenerator')
const notifUserNewQuestion = require('../helpers/notifUserSMS')
const kue = require('kue')
const queue = kue.createQueue()

module.exports = {
    create(req, res) {
        TagGenerator(req.body.tags)
        Question
            .create({
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                createdAt: new Date()
            })
            .then(created => {
                res.status(201).json(created)
                queue.create('new-question', {
                    data: req.body.userId
                }).save()

            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findAll(req, res) {
        Question
            .find({})
            .populate('userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'votes.voteUserId',
                }
            })
            .populate('votes.voteUserId')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findOne(req, res) {
        Question
            .findById(req.params.id)
            .populate('userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'votes.voteUserId',
                }
            })
            .populate('votes.voteUserId')
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    res.status(200).json(found)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findByTag(req, res) {
        if (!Array.isArray(req.query.tags)) {
            req.query.tags = [req.query.tags]
        }
        let tagArray = [];
        let tagArraywithRegex = []
        let query = {}
        query = { tags: { $all: tagArraywithRegex } }

        req.query.tags.forEach(tag => {
            tagArraywithRegex.push(new RegExp('^' + tag, 'i'))
        })
        Question
            .find(query)
            .populate('userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'votes.voteUserId',
                }
            })
            .populate('votes.voteUserId')
            .sort([['createdAt', 'descending']])
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    },

    edit(req, res) {
        TagGenerator(req.body.tags)
        Question
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Question
                        .findByIdAndUpdate(req.params.id, {
                            title: req.body.title,
                            content: req.body.content,
                            tags: req.body.tags
                        }, { new: true })
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    vote(req, res) {
        if (req.body.vote !== "true" && req.body.vote !== "false") {
            res.status(400).json({
                msg: "wrong input type."
            });
        } else {
            let vote = "";
            if (req.body.vote === "true") {
                vote = true;
            } else {
                vote = false;
            }
            Question
                .findByIdAndUpdate(req.params.id,
                    {
                        $push: {
                            votes: {
                                voteUserId: req.body.userId,
                                status: vote
                            }
                        }
                    },
                    { new: true }
                )
                .then(updatedQuestion => {
                    console.log("success update vote: ", vote);
                    res.status(200).json(updatedQuestion);
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err
                    });
                });
        }
    },

    delete(req, res) {
        Question
            .findById(req.params.id)
            .then(found => {
                if (!found) {

                } else {
                    return Question
                        .findByIdAndDelete(req.params.id)
                }
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}