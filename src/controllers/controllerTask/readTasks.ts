import { myDb } from "../../index";

export async function getToDosController(req: any, res: any) {
  try {
    const initDb = await myDb();

    initDb.connect();

    const db = initDb.db();

    const result = await db.collection("todos").find().toArray();

    res.status(200).json({
      message: "exit todos",
      todos: result,
    });

    await initDb.close();
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
