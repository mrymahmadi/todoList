import { NextFunction } from "express";
import { MongoClient } from "mongodb";
// import cookieParser from "cookie-parser";

// import authRoter from "./routes/authRouter";

const express = require("express");

const body = require("body-parser");

// tasks Data
export const myDb = async () =>
  await MongoClient.connect("mongodb://localhost:27017/toDoList");

async function start() {
  try {
    const app = express();
    //user Data
    // const usersData = await MongoClient.connect("mongodb://localhost:27017/usersAccount");

    // await usersData.connect();

    // app.db = usersData.db();

    // // tasks Data
    // const usersTaskData = await MongoClient.connect("mongodb://localhost:27017/toDoList");

    // await usersTaskData.connect();

    // app.db = usersTaskData.db();

    //body parser

    app.use(
      body.json({
        limit: "500kb",
      })
    );

    // app.use(cookieParser());

    // app.use((req: any, res: any, next: any) => {
    //   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
    //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    //   res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)
    //   next();
    // });

    app.use("/users", require("./routes/users"));

    app.use("/tasks", require("./routes/tasks"));

    // app.use(authRoter);

    // app.use(authRoter);

    //strat server

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

start();

// const router = express.Router();

// const app: Express = express();

// const PORT = process.env.PORT || 8888;

// let dbUrl = 'mongodb://localhost:27017/toDoList';

// MongoClient.connect(dbUrl)

// const mongoClient = new MongoClient(dbUrl)

// async function createMongoConnection() {
//     try {
//         await mongoClient.connect();
//         console.log("connected");
//     } catch (err){
//         console.log("error connecting to mongo"+ err);
//     } finally {
//         console.log("connected to mongo successfully1");
//     }
// }

// app.get('/usersAccount', (req, res) => {
//    res.json({msg: "welcome to the api"})
//   });

//   app.listen(5000, () => {
//     createMongoConnection();
//     console.log(`⚡️[server]: Server is running at http://localhost:5000`);
//   });
