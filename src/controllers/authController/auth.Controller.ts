// import express, { Request, Response } from "express";
// import { IUser, IUser2 } from "../../models/models";
// import { generateToken, clearToken } from "../../utils/auth";
// import { myDb } from "../..";

// const registerUser = async (req: Request, res: Response) => {
//   const initDb = await myDb();

//   initDb.connect();

//   const db = initDb.db();

//   const userCollection = db.collection<IUser2>("usersAcc");
//   const { userName, email, password } = req.body;
//   const userExists = await userCollection.findOne({ email });

//   if (userExists) {
//     res.status(400).json({
//       message: "the email alrealy exsist",
//     });
//   }

//   const user = await userCollection.insertOne({
//     userName,
//     email,
//     password,
//     comparePassword: function (enteredPassword: string): boolean {
//       throw new Error("Function not implemented.");
//     },
//   });

//   if (user) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       user: req.body,
//     });
//   } else {
//     res.status(401).json({
//       message: "An error accrurred in creating the user",
//     });
//   }
// };

// const authenticateUser = async (req: Request, res: Response) => {
//   const initDb = await myDb();

//   initDb.connect();

//   const db = initDb.db();

//   const userCollection = db.collection<IUser2>("usersAccount");
//   const { email, password } = req.body;

//   const user = await userCollection.findOne({ email });

// //   if (user && (await user.comparePassword(password))) {
// //     generateToken(res, user._id);
// //     res.status(201).json({
// //       id: user._id,
// //       name: user.userName,
// //       email: user.email,
// //     });
// //   } else {
// //     res.status(401).json({ message: "User not found / password incorrect" });
// //   }
// // };

// const logoutUser = (req: Request, res: Response) => {
//   clearToken(res);
//   res.status(200).json({ message: "User logged out" });
// };

// export { registerUser, authenticateUser, logoutUser };
