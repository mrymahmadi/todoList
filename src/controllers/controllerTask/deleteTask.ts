import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";

export async function deleteUserToDoController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const Tododb = initDb.db();

    const todoCollection = Tododb.collection<IUser>("todos");

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "this task not exist" });
    }

    const result = await todoCollection.deleteOne({
      _id: new ObjectId(id),
    });

    const nowTaks = await todoCollection.find().toArray();
    // const taskRemoved = await todoCollection.findOne({
    //   id: new ObjectId(result.deletedCount),
    // });

    await initDb.close();

    if (!result) {
      res.status(400).json({ message: "todo not found!" });
    }

    res.status(200).json({
      message: "todo deleted",
      todo: nowTaks,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
