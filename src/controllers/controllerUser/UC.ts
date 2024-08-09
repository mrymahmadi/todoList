import { createUserController } from "./createUser";
import { deleteUserController } from "./deleteUser";
import { registerUserController } from "./loginUser";
import { getUserController } from "./readUser";
import { getUsersController } from "./readUsers";
import { updateUserController } from "./updateUser";

export const userSetup = () => {
  createUserController;
  deleteUserController;
  registerUserController;
  getUserController;
  getUsersController;
  updateUserController;
};

export * from "./createUser";
export * from "./deleteUser";
export * from "./loginUser";
export * from "./readUser";
export * from "./readUsers";
export * from "./updateUser";
