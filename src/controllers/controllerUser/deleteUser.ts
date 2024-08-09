import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser } from "../../models/models";

export async function deleteUserController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const userdb = initDb.db();

    const userCollection = userdb.collection<IUser>("users");

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "this user not exist" });
    }

    const result = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });

    const nowUsers = await userCollection.find().toArray();

    if (!result) {
      res.status(400).json({ message: "user not found!" });
    }

    res.status(200).json({
      message: "user deleted",
      users: nowUsers,
    });
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
