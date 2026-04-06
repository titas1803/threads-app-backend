import prisma from "#/lib/db.js";
import { UserService } from "#/services/user.js";
import type { CreateUserInput, User } from "#/types/index.js";

interface UserMutationResolvers {
  createUser: (_: unknown, args: CreateUserInput) => Promise<unknown>;
}

export const userMutations = (): { Mutation: UserMutationResolvers } => {
  return {
    Mutation: {
      createUser: async (_, payload: CreateUserInput) => {
        // Implementation for creating a new user
        try {
          const createdUser = await UserService.createUser(payload);
          return {
            success: true,
            message: "User created successfully",
            userid: createdUser.id,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return {
            success: false,
            message: "Error creating user",
            error: error instanceof Error ? error.message : String(error),
          };
        }
      },
    },
  };
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
    loginUser: async (
      _: unknown,
      { email, password }: { email: string; password: string },
    ) => {
      try {
        const token = await UserService.loginUser({ email, password });
        return token;
      } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Invalid email or password");
      }
    },
  },
};
