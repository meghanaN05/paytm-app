const express = require("express");
const router = express.Router(); // Use this instead of requiring express twice
const userRouter = require("./user");
const bankRouter = require("./account");
const cors = require("cors");

// No need to create a new express app here, just use the router
router.use(cors());
router.use("/user", userRouter);
router.use("/account", bankRouter);

module.exports = router;

