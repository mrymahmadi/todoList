import { IUser } from "../models/models";

const users: IUser[] = [];

export const getUsers = async (): Promise<IUser[]> => {
  return users;
};

export const createUser = async (user: IUser): Promise<IUser> => {
  users.push(user);
  return user;
};
