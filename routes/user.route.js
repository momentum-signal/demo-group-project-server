/* external import */
const express = require("express");

/* internal import */
const {
  registerAnUser,
  loggedAnUser,
  confirmEmail,
  displayAllUsers,
  resetPassword,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");

/* router level connection */
const router = express.Router();

router.get("/all", verifyToken, displayAllUsers);
router.post("/signup", registerAnUser);
router.post("/signin", loggedAnUser);
router.get("/:token", confirmEmail);
router.patch("/reset", resetPassword);

module.exports = router;
