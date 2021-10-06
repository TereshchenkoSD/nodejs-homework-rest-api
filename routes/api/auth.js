const express = require("express");

const { joiSchema } = require("../../models/user");

const ctrl = require("../../controllers/auth");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validation(joiSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
