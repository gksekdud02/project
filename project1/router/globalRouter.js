const express = require("express")
const { home, search } = require("../controller/boardController.js");
const { join,login,registerUser,loginUser,logout} = require("../controller/userController.js");
const globalRouter = express.Router();

globalRouter.get("/",home);
globalRouter.get("/join",join);
globalRouter.post("/register",registerUser)
globalRouter.get("/login",login);
globalRouter.post("/logout",logout)
globalRouter.post("/loginuser",loginUser)
globalRouter.get("/search",search);

module.exports = globalRouter;