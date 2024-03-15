import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";
import { ITask } from "../../models/models";

export async function updateToDosController(req: any, res: any) {
  try {
    const { id } = req.body;
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    const result = await todosCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          done: req.body["done"],
          title: req.body.title,
          description: req.body.description,
        },
      }
    );

    await initDb.close();
    if (!result) {
      res.status(400).json({
        message: "task not found!",
      });
    }

    res.status(200).json({
      message: "tasks updated",
      todoUpd: { result },
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
