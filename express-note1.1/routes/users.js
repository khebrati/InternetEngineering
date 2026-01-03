let express = require("express");
let router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);

router.post("/register", user_controller.user_register_post);

router.get("/register", user_controller.user_register_get);

router.get("/login", user_controller.user_login_get);

router.post("/login", user_controller.user_login_post);

router.get("/logout", user_controller.user_logout_get);

router.get("/admin", user_controller.user_admin_get);

module.exports = router;
