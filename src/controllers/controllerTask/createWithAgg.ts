import { ObjectId } from "mongodb";
import { IUser } from "../../models/models";
import { ITask } from "../../models/models";
import { myDb } from "../../index";


// this file is for test aggragate function, and not work yet

export async function createUserTaskAggControllerr(req: any, res: any) {
  try {
    const { title, description, user, category } = req.body;

    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    if (!title) {
      return res.status(400).json({ message: "taskTitle is required" });
    }

    if (description && description.length < 10) {
      return res
        .status(400)
        .json({ message: "Task Detail must be at least 10 length" });
    }

    const result = await todosCollection.insertOne({
      title,
      description,
      done: false,
      user: new ObjectId(user),
      category,
    });

    console.log({ result });

    //test - dont work1
    // const updateUserCollection = await userCollection.aggregate([
    //   {
    //     $match: {
    //       _id: new ObjectId(user),
    //     },
    //   },
    //   { $unwind: "$todos" },
    //   {
    //     $lookup: {
    //       from: "todosCollection",

    //       Pipeline: [
    //         { $match: { $expr: { $eq: ["$_id", "$$user"] } } },
    //         { $addFields: { $todos: "$$todos" } },
    //       ],
    //       // localField: "_id",
    //       // foreignField: "user",
    //       as: "todos",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       name: { $first: "$name" },
    //       todos: { $push: { $arrayElemAt: ["$todos", 0] } },
    //     },
    //   },
    // ]);

    //test2
    // const updateUserdata = userCollection.aggregate([
    //   {
    //     $unwind: {
    //       path: "$todos",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "todosCollection",
    //       localField: "_id",
    //       foreignField: "user",
    //       as: "todos",
    //     },
    //   },
    //   {
    //     $set: {
    //       "todos.description": {
    //         $arrayElemAt: ["$todos.discription", 0],
    //       },
    //       "todos.done": { $arrayElemAt: ["$todos.done", 0] },
    //     },
    //   },
    //   {
    //     $project: {
    //       description: 0,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       user: { $push: "$user" },
    //     },
    //   },
    // ]);

    //tset3
    // const updUser = await userCollection.aggregate([
    //   {
    //     $group: {
    //       _id: "$user",
    //       todos: {
    //         $push: {
    //           title: "$title",
    //         },
    //       },
    //     },
    //   },
    //   { $out: "todos" },
    //   { $limit: 1 },
    // ]);

    await initDb.close();

    if (result.acknowledged) {
      return res.status(200).json({ message: "task created" });
    } else {
      throw new Error("task not created");
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
