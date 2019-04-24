const Question = require('../models/question')

module.exports = async (req, res, next) => {
    let question = await Question
        .findById(req.params.id)
        .populate('votes.voteUserId')
    question.votes.map((e) => {
        if (e.status.toString() === req.body.vote && e.voteUserId._id.toString() === req.body.userId) {
            throw new Error("401")
        }
    })
    next()
}