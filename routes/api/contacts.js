const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(contactSchema), controllerWrapper(ctrl.add));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(ctrl.updateById)
);

module.exports = router;
