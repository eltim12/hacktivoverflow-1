const router = require('express').Router()
const answerController = require('../controllers/answerController')
const { authenticate, authorizeAnswer } = require('../middlewares/verify')

//create new answer
router.post("/", authenticate, answerController.create);

//get all answers data
router.get("/", answerController.findAll);

//get one answer data find by id
router.get("/:id", answerController.findOne);

//get one answer data find by question id
// router.get("/questionFind/:id", answerController.findByQuestion);

//update an answer
router.patch("/:id", authenticate, authorizeAnswer, answerController.edit);

//vote an answer
router.patch("/vote/:id", authenticate, answerController.vote);

//delete an answer
router.delete("/:id", authenticate, authorizeAnswer, answerController.delete);


module.exports = router