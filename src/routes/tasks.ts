import { createUserTaskController } from "../controllers/controllerTask/createTask";
import { getToDosController } from "../controllers/controllerTask/readTasks";
import { getToDoController } from "../controllers/controllerTask/readTask";
import { deleteUserToDoController } from "../controllers/controllerTask/deleteTask";
import { updateToDosController } from "../controllers/controllerTask/updateTask";
import { createUserTaskAggControllerr } from "../controllers/controllerTask/createWithAgg";

// const express = require('express');
import express from "express";
const router = express.Router();

console.log("tasks routes");

router.get("/", getToDosController);

router.get("/findOne", getToDoController);

router.post("/", createUserTaskController);

//this rout is for test aggragate- not working!
router.post("/add", createUserTaskAggControllerr);

router.put("/updateTask", updateToDosController);

router.delete("/remove", deleteUserToDoController);

module.exports = router;
