import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";
import { ITask } from "../../models/models";

export async function updateUserController(req: any, res: any) {
  try {
    const { id } = req.body;
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    const result = await userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        },
      }
    );

    if (!result) {
      res.status(400).json({ message: "user not found!" });
    }

    res.status(200).json({
      message: "user retrieved",
      user: result,
    });
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
