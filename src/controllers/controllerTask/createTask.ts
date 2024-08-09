import { ObjectId } from "mongodb";
import { ICategory, IUser, ITask } from "../../models/models";
import { myDb } from "../../index";

export async function createUserTaskController(req: any, res: any) {
  try {
    const { title, description, user, category } = req.body;

    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");
    const categoryCollection = db.collection<ICategory>("categories");

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

      // new ObjectId(userId),
    });

    console.log({ result, category });

    const updateUserData = await userCollection.updateOne(
      {
        _id: new ObjectId(user),
      },
      {
        // $push: { todos: result.insertedId },
        $push: { todos: req.body },
      }
    );

    const thisTask = await todosCollection.findOne({
      _id: new ObjectId(result.insertedId),
    });

    const existCategory = await categoryCollection.findOne({
      category: category,
    });

    if (!existCategory) {
      const updateCategoryData = await categoryCollection.insertOne({
        category: req.body.category,
      });
    }

    await initDb.close();

    if (result.acknowledged) {
      return res.status(200).json({
        message: "tasks retrieved",
        todo: { thisTask },
      });
    } else {
      throw new Error("task not created");
    }
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
