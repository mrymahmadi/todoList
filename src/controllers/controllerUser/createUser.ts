import { ObjectId } from "mongodb";
import { ITask } from "../../models/models";
import { IUser } from "../../models/models";
import { myDb } from "../../index";

// export interface IUser {
//   _id?: ObjectId;
//   name: string;
//   password: string;
//   email: string;
//   todos: ITask[] | ObjectId[];
// }

export async function createUserController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const userCollection = db.collection<IUser>("users");

    const { name, password, email } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    if (password && password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must be at least 8 length" });
    }

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const existingUser = await userCollection.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({ message: "this email alrealy exist" });
    }

    const result = await userCollection.insertOne({
      name,
      password,
      email,
      todos: [],
    });

    const foundedUser = await userCollection.findOne(
      { _id: result.insertedId },
      { projection: { password: 0 } }
    );

    if (result.acknowledged) {
      res.status(200).json({
        message: "user created",
        user: { ...result, user: foundedUser },
      });
    } else {
      throw new Error("user not created");
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
