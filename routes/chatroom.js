const router = require("express").Router();
const { catchErrors } = require("../handlers/errorhandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.post("/", auth, catchErrors(chatroomController.createChatroom));
//               *   auth middleware is required to success (call next() in auth.js) to enter this route.

module.exports = router;