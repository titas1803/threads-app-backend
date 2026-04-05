import prisma from "../lib/db.js";
import type { CreateUserInput, User } from "../types/index.js";

interface UserMutationResolvers {
  createUser: (_: unknown, args: CreateUserInput) => Promise<unknown>;
}

export const userMutations: { Mutation: UserMutationResolvers } = {
  Mutation: {
    createUser: async (
      _,
      {
        firstName,
        lastName,
        email,
        password,
        profileImageUrl,
      }: CreateUserInput,
    ) => {
      // Implementation for creating a new user
      try {
        const createdUser = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            profileImageUrl: profileImageUrl ?? null,
            salt: "random_salt_value", // @TODO:In a real application, generate a secure salt
          },
        });
        console.log("User created successfully:", createdUser);
        return true;
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    },
  },
};

export const userQueries = {
  Query: {
    users: async () => {
      try {
        const users = await prisma.user.findMany();
        console.log("Fetched users successfully:", users);
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
  },
};
