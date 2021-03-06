var express = require("express");
const {
  loginMember,
  verifyValidToken,
  resetMemberPassword,
  updateMembersPassword,
  loginSponsor,
} = require("../controllers/auth-controller");
var router = express.Router();

router.post("/login", loginMember);
router.post("/login/sponsor", loginSponsor);
router.get("/verify-token", verifyValidToken);
router.post("/members/reset-password", resetMemberPassword);
router.post("/members/update-password", updateMembersPassword);

module.exports = router;
