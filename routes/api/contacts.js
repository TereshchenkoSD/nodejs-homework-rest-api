const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");
const {
  contactJoiSchema,
  updateFavouriteJoiSchema,
} = require("../../models/contact");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(contactJoiSchema), controllerWrapper(ctrl.add));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactJoiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId",
  validation(updateFavouriteJoiSchema),
  controllerWrapper(ctrl.updateFavourite)
);

module.exports = router;
