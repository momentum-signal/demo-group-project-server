/* external import */
const express = require("express");

/* internal import */
const {
  registerAnUser,
  loggedAnUser,
  confirmEmail,
} = require("../controllers/user.controller");

/* router level connection */
const router = express.Router();

router.post("/signup", registerAnUser);
router.post("/signin", loggedAnUser);
router.get("/:token", confirmEmail);

module.exports = router;
