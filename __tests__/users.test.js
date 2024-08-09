const { MongoClient } = require("mongodb");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017");
    db = await connection.db("barg");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("user");

    const mockUser = {
      _id: "66802104d9576022aa1c9161",
      first_name: "Edison",
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({
      _id: "66802104d9576022aa1c9161",
    });
    expect(insertedUser).toEqual(mockUser);
  });
});
