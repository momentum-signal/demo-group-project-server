/* external import */
const express = require("express");

/* internal import */
const {
  registerAnUser,
  loggedAnUser,
  confirmEmail,
  displayAllUsers,
  resetPassword,
  avatarUpload,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization.middleware");
const upload = require("../middlewares/upload.middleware");
const verifyToken = require("../middlewares/verifyToken.middleware");

/* router level connection */
const router = express.Router();

router.post("/avatar", upload.single("avatar"), avatarUpload);
router.get("/all", verifyToken, authorization("user"), displayAllUsers);
router.post("/signup", registerAnUser);
router.post("/signin", loggedAnUser);
router.get("/:token", confirmEmail);
router.patch("/reset", resetPassword);

module.exports = router;
