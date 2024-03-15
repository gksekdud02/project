const express = require("express")
const { seeBoard, editBoard, deleteBoard, writeBoard } = require("../controller/boardController.js")
const boardRouter = express.Router();

boardRouter.get("/write", writeBoard);
boardRouter.get("/:id", seeBoard);
boardRouter.get("/:id/edit", editBoard);
boardRouter.get("/:id/delete", deleteBoard);

module.exports = boardRouter;