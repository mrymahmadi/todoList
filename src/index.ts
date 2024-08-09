// example one
import { MongoClient } from "mongodb";

const express = require("express");
const body = require("body-parser");

// tasks Data
export const myDb = async () =>
  await MongoClient.connect("mongodb://localhost:27017/toDoList");

async function start() {
  try {
    const app = express();

    app.use(
      body.json({
        limit: "500kb",
      })
    );

    app.use("/users", require("./routes/users"));

    app.use("/tasks", require("./routes/tasks"));

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

start();

/* 2
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uri = "mongodb://localhost:27017";
const dbName = "testdb";
let db: any;

MongoClient.connect(uri)
  .then((client) => {
    db = client.db(dbName);
    console.log("conncted to db");
  })
  .catch((error) => console.log(error));

//sample route o create a user
app.use("/users", require("../src/routes/users"));

app.use("/tasks", require("../src/routes/tasks"));

app.listen(PORT, () => {
  console.log(`server is running om http://localhost:${PORT}`);
});

module.exports = app;

//3
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
export const myDb = async () =>
  await MongoClient.connect("mongodb://localhost:27017/toDoList2");

app.use(express.json());
app.use("/users", require("../src/routes/users"));

app.use("/tasks", require("../src/routes/tasks"));

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
export default app;
*/
