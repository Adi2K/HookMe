const express = require("express");
const router = express.Router();

const {
    ListController,
    RegisterController,
    UpdateController,
    DeleteController,
    TriggerIPController,
} = require("../../controllers/webhook.controller");


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route("/read").get(ListController);
router.route("/create").post(RegisterController);
router.route("/update").put(UpdateController);
router.route("/delete").delete(DeleteController);
router.route("/ip").post(TriggerIPController);

module.exports = router;