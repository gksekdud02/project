const express = require("express")
const cookieParser = require("cookie-parser")
const globalRouter = require("./router/globalRouter.js")
const userRouter = require("./router/userRouter.js")
const boardRouter = require("./router/boardRouter.js")
const app = express()
const PORT = 8000;

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/board",boardRouter);

app.listen(PORT)
