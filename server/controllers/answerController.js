const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    create(req, res) {
        let createdAnswer = {}
        Answer
            .create({
                userId: req.body.userId,
                content: req.body.content,
                createdAt: new Date(),
            })
            .then(created => {
                createdAnswer = created

                return Question
                    .findByIdAndUpdate(req.body.questionId, {
                        $push: { answers: created._id }
                    }, {new: true})
            })
            .then(updated => {
                res.status(201).json(createdAnswer)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findAll(req, res) {
        Answer
            .find({})
            .populate('userId')
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findOne(req, res) {
        Answer
            .findById(req.params.id)
            .populate('userId')
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

    edit(req, res) {
        Answer
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Answer
                        .findByIdAndUpdate(req.params.id, {
                            content: req.body.content
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
                vote = 1;
            } else {
                vote = 0;
            }
            Answer
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
                .then(updatedAnswer => {
                    console.log("success update vote: ", vote);
                    res.status(200).json(updatedAnswer);
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err
                    });
                });
        }
    },

    delete(req, res) {
        Answer
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Answer.findByIdAndDelete(req.params.id)
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