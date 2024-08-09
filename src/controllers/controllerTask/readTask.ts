import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";
import { ITask } from "../../models/models";

export async function getToDoController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "this task not exist" });
    }

    const result = await todosCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      res.status(400).json({ message: "task not found!" });
    }

    const foundedUser = await userCollection.findOne(
      { _id: result?._id },
      { projection: { todos: 0, password: 0, name: 1 } }
    );

    await initDb.close();

    res.status(200).json({
      message: "tasks retrieved",
      todo: { ...result, user: foundedUser },
    });
  } catch (error) {
    res.status(500).json({ error: "EEROR" });
  }
}
