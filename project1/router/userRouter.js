const express = require("express")
const { see , edit, remove } = require("../controller/userController.js")
const userRouter = express.Router();

userRouter.get("/edit",edit);
userRouter.delete("/delete/:username",remove);
userRouter.get("/:username",see);

module.exports = userRouter;


