const router = require('express').Router()
const questionController = require('../controllers/questionController')
const { authenticate, authorizeQuestion } = require('../middlewares/verify')
const checkVote = require('../middlewares/checkVote')

//create new question
router.post("/", authenticate, questionController.create);

//get all questions data
router.get("/", questionController.findAll);

//get all questions by tag
router.get("/tag", questionController.findByTag);

//get one question data find by any
router.get("/:id", questionController.findOne);

//edit a question
router.put("/:id", authenticate, authorizeQuestion, questionController.edit);

//vote a question
router.patch("/vote/:id", authenticate, questionController.vote);

//delete a question
router.delete("/:id", authenticate, authorizeQuestion, questionController.delete);

module.exports = router