import { myDb } from "../../index";
import { IUser } from "../../models/models";

export async function getUsersController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const userdb = initDb.db();

    const userCollection = userdb.collection<IUser>("users");

    const result = await userCollection.find().toArray();

    res.status(200).json({
      message: "users retrieved",
      users: result,
    });
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
