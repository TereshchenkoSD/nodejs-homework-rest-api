const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { controllerWrapper, validation } = require("../../middlewares");
const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
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
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router;
