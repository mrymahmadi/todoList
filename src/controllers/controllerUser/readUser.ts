import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";
import { ITask } from "../../models/models";

export async function getUserController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: "this user not exist" });
    }

    const result = await userCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res.status(400).json({ message: "user not found!" });
    }

    const todos = await todosCollection
      .find(
        { _id: { $in: result.todos as ObjectId[] } },
        { projection: { user: 0 } }
      )
      .toArray();

    res.status(200).json({
      message: "users retrieved",
      user: { ...result, todos },
    });
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
