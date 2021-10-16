const express = require("express");

const { joiSchema } = require("../../models/user");

const ctrl = require("../../controllers/auth");
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validation(joiSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrentUser));

router.post(
  "/avatars",
  authenticate,
  upload.single("image"),
  controllerWrapper(ctrl.uploadAvatar)
);

module.exports = router;
