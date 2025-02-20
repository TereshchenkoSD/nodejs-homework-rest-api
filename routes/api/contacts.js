const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require("../../models/contact");

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router;
