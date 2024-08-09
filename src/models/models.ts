import { ObjectId } from "mongodb";

export interface ICategory {
  _id?: ObjectId;
  category: string;
}

export interface IUser {
  _id?: ObjectId;
  name: string;
  password: string;
  email: string;
  todos?: ITask[] | ObjectId[];
}

export interface ITask {
  _id?: ObjectId;
  category: ICategory[] | ObjectId[];
  title: string;
  description: string;
  done: boolean;
  user: ObjectId | IUser;
}

export interface IUser2 {
  _id?: ObjectId;
  userName: string;
  email: string;
  password: string;
  //ooops , this for mongoose
  comparePassword: (enteredPassword: string) => boolean;
}
