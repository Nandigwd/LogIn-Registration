const { createUser, getallUser ,getUser, updateUser, deleteuser, getUserByEmail} = require("./user_controller");

const router = require("express").Router();
const { checktoken} = require("../../middleware/auth");

router.post("/", checktoken, createUser);
router.get("/", checktoken, getallUser);
router.get("/:id", checktoken, getUser);
router.put("/", checktoken, updateUser);
router.delete("/", checktoken, deleteuser);
router.post("/login", getUserByEmail);

module.exports= router; 