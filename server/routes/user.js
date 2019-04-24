const router = require("express").Router();
const userController = require("../controllers/userController");
const { authenticate, authorizeUser } = require('../middlewares/verify')
const getTagId = require('../middlewares/tagId')

//get all users data
router.get("/", userController.findAll);

//get one user data find by any
router.get("/:id", authenticate, authorizeUser, userController.find);

//update a user
router.patch("/:id", userController.update)

//add watchedtag
router.patch("/watchedTag/:id", authenticate, authorizeUser, getTagId, userController.watchedTag)


//delete a user
router.delete("/:id", userController.delete)

//register new user
router.post("/", userController.create);

//login a user
router.post("/login", userController.login);

//verify a user 
router.post("/verify", userController.verify)


module.exports = router;