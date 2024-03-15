import { createUserController } from "../controllers/controllerUser/createUser";
import { getUsersController } from "../controllers/controllerUser/readUsers";
import { getUserController } from "../controllers/controllerUser/readUser";
import { deleteUserController } from "../controllers/controllerUser/deleteUser";
import { updateUserController } from "../controllers/controllerUser/updateUser";
import { registerUserController } from "../controllers/controllerUser/loginUser";

// const express = require('express');
import express from "express";
const router = express.Router();

console.log("users routes");

router.get("/", getUsersController);

router.get("/oneUser", getUserController);

router.post("/", createUserController);

router.post("/register", registerUserController);

router.put("/edituser", updateUserController);

router.delete("/deleteUser", deleteUserController);

module.exports = router;
