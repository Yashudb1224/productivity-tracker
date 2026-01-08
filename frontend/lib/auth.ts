import { User } from "@/types/user";
import { nanoid } from "nanoid";

export const createUser = (name: string): User => {
  return {
    id: nanoid(),
    name,
    habits: [],
    createdAt: new Date().toISOString(),
  };
};
