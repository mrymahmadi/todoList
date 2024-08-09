import { ObjectId } from "mongodb";
import { myDb } from "../../index";
import { IUser, ITask } from "../../models/models";

export async function registerUserController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");
    const todosCollection = db.collection<ITask>("todos");

    const { email, password } = req.body;

    const existingUser = await userCollection.findOne({
      email: email.toLowerCase(),
    });

    if (!existingUser) {
      return res.status(400).json({ message: "user not found!" });
    } else {
      const checkPassword = existingUser.password == req.body.password;
      if (!checkPassword) {
        res.status(401).json({
          message: `hey ${existingUser.name} this password incorrect`,
        });
      } else {
        return res.status(200).json({ message: "register success!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "ERROR" });
  }
}
